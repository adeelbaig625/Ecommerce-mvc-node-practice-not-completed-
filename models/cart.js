const e = require('express');
const fs=require('fs')
const path=require('path')
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );
module.exports=class Cart
 {
   static addProduct(id,productPrice)
   {
        fs.readFile(p,(err,fileContent)=>
        {
            let cart={products:[],totalprice:0};
        if(!err)
            {
                cart=JSON.parse(fileContent);  
            } 
        const existingProductIndex=cart.products.findIndex(p=>p.id===id);
        const existingProduct=cart.products[existingProductIndex];
        let updatedProduct;
        if(existingProduct)
        {
            updatedProduct={...existingProduct};
            updatedProduct.qty=updatedProduct.qty+1;  
            cart.products=[...cart.products];
            cart.products[existingProductIndex]=updatedProduct;
        }
        else{
            updatedProduct={id:id,qty:1};
            cart.products=[...cart.products,updatedProduct];   
        }
        cart.totalprice= parseInt(cart.totalprice)+ parseInt(productPrice);
        fs.writeFile(p,JSON.stringify(cart),err=>
        {
            console.log(err);
        });
    });
   } 
static deleteProduct(id,productPrice)
{
    fs.readFile(p,(err,fileContent)=>{
        if(err)
        {
            return;
            JSON.parse
        }
        const updatedCart={...(JSON.parse(fileContent))};
        const product=updatedCart.products.find(p=>p.id==id)
        if(!product)
        {
            return;
        }
        const productQty=product.qty
        updatedCart.products=updatedCart.products.filter(p=>p.id!==id)
        updatedCart.totalprice-=productPrice*productQty
        fs.writeFile(p,JSON.stringify(updatedCart),err=>
        {
            if(err)
            {console.log(err)}
        })
    }
    )
}
}