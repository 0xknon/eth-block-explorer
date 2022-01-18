# ETH Block Explorer
  

The backend has been splitted into two parts:

1. New block subscription
2. Daily cron job of writing smart contract

## Get Started



1. Add the following to `/etc/hosts`

> ```
> 127.0.0.1       mongo1
> 127.0.0.1       mongo2
> 127.0.0.1       mongo3
> ```

2. Start local hardhat network
> ```
> yarn && yarn start
> ```


3. Deploy smart contract to local network
> ```
> yarn deploy
> ...
> BlockSummary deployed to: <COPY THE ADDRESS SHOWN>
> ```

4. Update `BLOCK_SUMMARY_ADDRESS` in `server/.env` with address copied

5. Start the New block subscription and MongoDB

> ```
> cd server && docker-compose up --build -d
> ```


> MongoDB cluster can be connected with 
> ```
> mongodb://mongo1:27017,mongo2:27027,mongo3:27037/eth
> ```

6. Start the cron job
> ```
> yarn && yarn build && yarn start:cron
> ```

## Notes

The imperfection of the solution will b pointed out here:

1. `.env` is not included in `.gitignore` because of demo purpose
2. In the solution, 2 subscription backends are running to avoid one of those suddenly down. Unique `mixHash` validation is done to prevent duplciate record. It may increase the loading of database, but probably better than increase the loading to the server to prevent duplicate record insertion.
3. The logging for `mongoose` is not in JSON format. Not consistent for server monitoring tools like EFK / ELK stack.
4. If the cron job server is down during the scheduled time, there may be missing record. Manual trigger may be needed or add checking for missing record when the cron job server is restarted.
5. The `Cron Job` and the `Block Subscrption` are sharing the same code base but deploy separately. This can be good or bad, but the main reason is because the smart contract is easier to deploy to the local hardhat network with fewer commands
6. `Local hardhat network` is used since it is easier for the demo.