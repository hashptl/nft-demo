/* eslint-disable no-unused-vars */
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Nft", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const Nft = await ethers.getContractFactory("Nft");
    const NFT = await Nft.deploy();

    await NFT.deployed();

    const recipient = "";
  });
});
