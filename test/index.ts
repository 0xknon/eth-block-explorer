import { Contract } from "@ethersproject/contracts";
import dayjs from "dayjs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("BlockSummary", async function () {
  let blockSummary: Contract;

  beforeEach(async () => {
    // This is executed before each test
    const BlockSummary = await ethers.getContractFactory("BlockSummary");
    blockSummary = await BlockSummary.deploy();
  });

  it("should add summary successfully", async function () {
    const timestamp = dayjs("2022-01-01").unix();
    const totalNumOfBlocks = 14023965;
    const totalGasSpent = 987654321111;
    const addSummaryTx = await blockSummary.addSummary(
      timestamp,
      totalNumOfBlocks,
      totalGasSpent
    );
    await addSummaryTx.wait();

    const summaries = await blockSummary.getSummaries();
    expect(summaries[0][0]).to.equal(timestamp);
    expect(summaries[0][1]).to.equal(totalNumOfBlocks);
    expect(summaries[0][2]).to.equal(totalGasSpent);
  });

  it("should not allow non-owner to add summary", async function () {
    const [, addr1] = await ethers.getSigners();
    const timestamp = dayjs("2022-01-01").unix();
    const totalNumOfBlocks = 12345;
    const totalGasSpent = 987654321111;
    await expect(
      blockSummary
        .connect(addr1)
        .addSummary(timestamp, totalNumOfBlocks, totalGasSpent)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
