pragma solidity ^0.4.15;

contract AtomicSwap {

    enum State { Empty, Initiator, Participant }

    struct Swap {
        uint initTimestamp;
        uint refundTime;
        bytes20 hashedSecret;
        bytes32 secret;
        address initiator;
        address participant;
        uint256 value;
        bool emptied;
        State state;
    }

    mapping(bytes20 => Swap) public swaps;
    
	event Refunded(uint _refundTime);
    event Redeemed(uint _redeemTime);
    event Participated(
        address _initiator, 
        address _participator, 
        bytes20 _hashedSecret,
        uint256 _value
    );
	event Initiated(
		uint _initTimestamp,
    	uint _refundTime,
    	bytes20 _hashedSecret,
    	address _participant,
    	address _initiator,
		uint256 _funds
	);

	function AtomicSwap() {}
    
	modifier isRefundable(bytes20 _hashedSecret) {
	    require(block.timestamp > swaps[_hashedSecret].initTimestamp + swaps[_hashedSecret].refundTime);
	    require(swaps[_hashedSecret].emptied == false);
	    _;
	}
	
	modifier isRedeemable(bytes20 _hashedSecret, bytes32 _secret) {
	    require(ripemd160(_secret) == _hashedSecret);
		require(block.timestamp < swaps[_hashedSecret].initTimestamp + swaps[_hashedSecret].refundTime);
	    require(swaps[_hashedSecret].emptied == false);
	    _;
	}
	
	modifier isInitiator(bytes20 _hashedSecret) {
	    require(msg.sender == swaps[_hashedSecret].initiator);
	    _;
	}
	
	modifier isNotInitiated(bytes20 _hashedSecret) {
	    require(swaps[_hashedSecret].state == State.Empty);
	    _;
	}

	function initiate (uint _refundTime,bytes20 _hashedSecret,address _participant) 
	    payable 
	    isNotInitiated(_hashedSecret)    
	{
	    swaps[_hashedSecret].refundTime = _refundTime;
	    swaps[_hashedSecret].initTimestamp = block.timestamp;
	    swaps[_hashedSecret].hashedSecret = _hashedSecret;
	    swaps[_hashedSecret].participant = _participant;
	    swaps[_hashedSecret].initiator = msg.sender;
        swaps[_hashedSecret].state = State.Initiator;
        swaps[_hashedSecret].value = msg.value;
		Initiated(
			swaps[_hashedSecret].initTimestamp,
    		_refundTime,
    		_hashedSecret,
    		_participant,
    		msg.sender,
		 	msg.value
		);
	}

    function participate(uint _refundTime, bytes20 _hashedSecret,address _initiator) 
        payable 
        isNotInitiated(_hashedSecret)
    {
        swaps[_hashedSecret].refundTime = _refundTime;
	    swaps[_hashedSecret].initTimestamp = block.timestamp;
        swaps[_hashedSecret].participant = msg.sender;
        swaps[_hashedSecret].initiator = _initiator;
        swaps[_hashedSecret].value = msg.value;
        swaps[_hashedSecret].hashedSecret = _hashedSecret;
        swaps[_hashedSecret].state = State.Participant;
        Participated(_initiator,msg.sender,_hashedSecret,msg.value);
    }
	
	function redeem(bytes32 _secret, bytes20 _hashedSecret) 
	    isRedeemable(_hashedSecret, _secret)
	{
        if(swaps[_hashedSecret].state == State.Participant){
            swaps[_hashedSecret].initiator.transfer(swaps[_hashedSecret].value);
        }
        if(swaps[_hashedSecret].state == State.Initiator){
            swaps[_hashedSecret].participant.transfer(swaps[_hashedSecret].value);
        }
        swaps[_hashedSecret].emptied = true;
        Redeemed(block.timestamp);
        swaps[_hashedSecret].secret = _secret;
	}

	function refund(bytes20 _hashedSecret)
	    isRefundable(_hashedSecret) 
	{
	    if(swaps[_hashedSecret].state == State.Participant){
            swaps[_hashedSecret].participant.transfer(swaps[_hashedSecret].value);
        }
        if(swaps[_hashedSecret].state == State.Initiator){
            swaps[_hashedSecret].initiator.transfer(swaps[_hashedSecret].value);
        }
        swaps[_hashedSecret].emptied = true;
	    Refunded(block.timestamp);
	}
}