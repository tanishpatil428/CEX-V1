

type balance = {
    available :number,
    locked :number
}

type UsersWallet ={
    balances :balance,
    stocks :{[symbol:string]:balance}
}



const UserWallet = new Map < number , UsersWallet > ()

export const deposit = (userId :number , amount:number)=>{
    
    if(amount <=0){
        return ("invalid amount")
    }
    
    const userCheck = UserWallet.get(userId)

    if(!userCheck){
        const newWallet = {balances :{available :amount ,locked:0} ,stocks:{}}
        UserWallet.set(userId, newWallet)
        return newWallet
    }

    userCheck.balances.available += amount;
    return userCheck
}

export const getBalance = (userId :number)=>{
    const userCheck = UserWallet.get(userId)
    if(!userCheck){
        return {balance :{available :0 , locked:0} ,stocks:{}}
    }

    return userCheck 
}

export const lockBalance = (userId:number, amount:number)=>{
    const userCheck = UserWallet.get(userId)

    if(!userCheck || userCheck.balances.available <= amount){
       throw new Error ("insufficent balance")
    }

    userCheck.balances.available -= amount
    userCheck.balances.locked  += amount

  
    return userCheck 
}

export const unlockBalance = (userId :number , amount :number) =>{
    const userCheck = UserWallet.get(userId)

    if(!userCheck || userCheck.balances.locked < amount){
        return ("insufficent balance")
    }

    userCheck.balances.locked -= amount
    userCheck.balances.available += amount

    return userCheck
}