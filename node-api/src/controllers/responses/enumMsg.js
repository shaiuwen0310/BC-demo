const enumMessage = {
    RETURN_CODE_0: [0, 'success'],
    RETURN_CODE_1: [1, 'no such file or directory: '],
    RETURN_CODE_2: [2, 'no CA information in the common config profile'],
    RETURN_CODE_3: [3, 'Failed to build wallet'],
    RETURN_CODE_4: [4, 'An identity for the admin user already exists in the wallet: '],
    RETURN_CODE_5: [5, 'Failed to enroll admin user'],
    RETURN_CODE_6: [6, 'An identity for the user already exists in the wallet: '],
    RETURN_CODE_7: [7, 'An identity for the admin user does not exist in the wallet, Enroll the admin user before retrying: '],
    RETURN_CODE_8: [8, 'Failed to register and enroll user'],
    RETURN_CODE_9: [9, 'Field is invalid in the request'],
    RETURN_CODE_10: [10, 'Failed to insert a scanfile'],
    RETURN_CODE_11: [11, 'Failed to modify a scanfile'],
    RETURN_CODE_12: [12, 'Failed to get scanfile'],
    RETURN_CODE_13: [13, 'Failed to get history of a scanfile'],
    RETURN_CODE_14: [14, 'Failed to delete a scanfile'],

    LOGGER_DISPLAY_ENTRANCE: "Enter function: ",
    LOGGER_DISPLAY_INPUT: "input: ",
    LOGGER_DISPLAY_OUTPUT: "output: ",
    LOGGER_DISPLAY_BUILT_CA: "Built a CA Client named: ",
    LOGGER_DISPLAY_ENROLLED_ADMIN: "Finished: enrolled admin user and imported it into the wallet",
    LOGGER_DISPLAY_ENROLLED_USER: "Finished: registered and enrolled user and imported it into the wallet: ",
    LOGGER_DISPLAY_LOADED_CCP: "Loaded the network configuration located at: ",
    LOGGER_DISPLAY_BUILT_FS_WALLET: "Built a file system wallet at: ",
    LOGGER_DISPLAY_BUILT_TEMP_WALLET: "Built an in memory wallet",
    LOGGER_DISPLAY_CONNECTED_NETWORK: "Finished: connected to the Network",
    LOGGER_DISPLAY_SUBMIT_TXN:  "Finished: submit Transaction"
}

module.exports = {
    enumMessage: enumMessage
}

// let index0 = message.RETURN_CODE_0[0];
// let index1 = message.RETURN_CODE_0[1];
// console.log(index0)
// console.log(index1)

// console.log(typeof message)