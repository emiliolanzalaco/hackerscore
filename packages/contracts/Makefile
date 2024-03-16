
-include .env

# Clean the repo
clean  :; forge clean

tests:; forge test --fork-url ${RPC_URL} -vvv

deploy:; forge create HackerScoreResolver  --chain base-sepolia --rpc-url "https://sepolia.base.org" --etherscan-api-key ${VERIFIER_API_KEY} --private-key ${PRIVATE_KEY} --verify --constructor-args "0x4200000000000000000000000000000000000021"