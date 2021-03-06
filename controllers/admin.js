const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product', 
    editing: false
  });
};
exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  const prodId=req.params.productId;
  console.log(prodId);
  if(!editMode)
  {
    return res.redirect('/');
  }
  Product.findById(prodId,product=>
    {
      if(!product)
      {
        return res.redirect('/')
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        product:product,
        editing:editMode
      });    
    });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save().then(()=>
  {
    res.redirect('/');
  }).catch(err=>console.log(err));
};

exports.postEditProduct=(req,res,next)=>
{
  const id=req.body.productId
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(id,title, imageUrl, description, price);
 
  
}
exports.postDeleteProduct=(req,res,next)=>
{
  id=req.body.productId
  Product.deletebyid(id,resume=>{
    if(resume=="true")
    {
    res.redirect('/admin/products')
    }
  })
  }
 
exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows,fieldData])=>
  {
    res.render('admin/products', {
      prods: rows,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
 
};
