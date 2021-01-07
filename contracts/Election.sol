pragma solidity >=0.5.16 < 0.7.0;

contract Election {
    // Read/write candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    uint public candidatesCount;
    bool private isInit;
    address private adminUser;

    function addCandidate (string memory _name) public {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateId) public {
        require(!voters[msg.sender]);
        require(_candidateId > 0 && _candidateId <= candidatesCount);
        voters[msg.sender] = true;
        candidates[_candidateId].voteCount ++;
        emit votedEvent(_candidateId);
    }
    event votedEvent (uint indexed _candidateId);

    function getAdmin () external view returns (address){
        return adminUser;
    }

    function setAdmin(address addr) public {
        adminUser = addr;
    }

    constructor () public {
        candidatesCount = 0;
        isInit = false;
    }
}