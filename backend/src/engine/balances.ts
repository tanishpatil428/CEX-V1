import { symbol } from "zod"


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
    
    const userCheck = UserWallet.has(userId)

    if(!userCheck){
        UserWallet.set(userId,{balances:{available:0, locked:0},stocks:{}})
    }

    const wallet = UserWallet.get(userId)!
    
    wallet.balances.available += amount

    return wallet
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

export const lockStock = (userId:number, symbol:string, qty:number)=>{
    const userCheck = UserWallet.get(userId)

    if(!userCheck || !userCheck.stocks[symbol] || userCheck.stocks[symbol].available < qty){
        throw new Error ("insufficent stock balance")
    }

    userCheck.stocks[symbol].available -= qty
    userCheck.stocks[symbol].locked += qty
}

export const depositStock =(symbol:string, qty:number, userId:number)=>{
    const userCheck = UserWallet.get(userId)
    if(!userCheck){
        UserWallet.set(userId ,{balances:{available:0,locked:0},stocks:{}})
    }
    const walletCheck = UserWallet.get(userId)!
    
    if(!walletCheck.stocks[symbol]){
        walletCheck.stocks[symbol] ={available:0,locked:0}
    }
    walletCheck.stocks[symbol].available += qty

    return walletCheck
}   