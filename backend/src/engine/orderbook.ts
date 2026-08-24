//orderBook ={axis:{sell:[price ,qty ,userid, orderid, created at],buy:[]}}//
type bookOrder ={
    userId:number,
    orderId:number,
    price:number,
    qty:number,
    createdAt:number
}

type Bookorder ={
    BUY:bookOrder[],
    SELL:bookOrder[]
}

const orderBook = new Map<string ,Bookorder >()

export const GetorderBook =(symbol:string)=>{
    const bookCheck = orderBook.has(symbol)
    if(!bookCheck){
        orderBook.set(symbol, {BUY:[],SELL:[]})
    }
  
    return orderBook.get(symbol)!
    
}

export const addOrderBook = (symbol:string,side:"BUY"|"SELL",order:bookOrder)=>{
    
    const currentBook = GetorderBook(symbol)
    if(side === "BUY"){
      currentBook.BUY.push(order)  
    }else{
       currentBook.SELL.push(order)
    } 
}