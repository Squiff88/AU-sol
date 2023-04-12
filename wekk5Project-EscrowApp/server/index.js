const express = require("express");
const cors = require("cors");

const app = express();

const port = 8080;

// Middlewares
app.use(cors());
app.use(express.json());

const contractData = [];

app.get("/contracts", (req, res) => {
  return res.status(200).json({
    contractData,
  });
});

app.post("/contracts", (req, res) => {
  console.log(req.params, "req maina >>>");
  console.log(req.body, "req body >>>");
  const {
    depositorAddress,
    arbiterAddress,
    beneficiaryAddress,
    contractAddress,
    contractEthValue,
    approved,
  } = req.body;

  if (
    !depositorAddress ||
    !arbiterAddress ||
    !beneficiaryAddress ||
    !contractAddress ||
    !contractEthValue ||
    contractEthValue === 0
  ) {
    return res.status(500).json({
      message: "parameters are not valid",
      data: null,
    });
  }

  const escrowDataModel = {};
  escrowDataModel.depositorAddress = depositorAddress;
  escrowDataModel.contractAddress = contractAddress;
  escrowDataModel.arbiterAddress = arbiterAddress;
  escrowDataModel.beneficiaryAddress = beneficiaryAddress;
  escrowDataModel.contractEthValue = contractEthValue;
  escrowDataModel.id = contractData.length;
  escrowDataModel.approved = approved;

  contractData.push(escrowDataModel);

  return res.status(200).json({
    message: "success",
    data: contractData,
  });
});

app.put("/contracts", (req, res) => {
  const { contractAddress } = req.body;

  const findEscrowContract = contractData.filter(
    (contract) => contract.contractAddress === contractAddress
  );

  console.log(contractData, "contractData it ????");
  console.log(contractAddress, "contractAddress it ????");
  console.log(findEscrowContract, "found it ????");

  if (findEscrowContract.length === 0) {
    return res.status(500).json({
      message: "No escrow contract was found",
      data: null,
    });
  }

  findEscrowContract[0].approved = true;

  return res.status(200).json({
    message: "Escrow contract was updated successfully !",
    data: null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
