const express = require('express');
const router = express.Router();

const { 
    create, 
    productById, 
    read,
    update,
    remove, 
    list, 
    listRelated, 
    listCategories,
    listBySearch,
    photo 
} = require("../controllers/product");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");


router.post("/product/create/:userId", requireSignin,isAdmin,isAuth, create);
router.get("/product/:productId", read);
router.put("/product/:productId/:userId",requireSignin,isAdmin,isAuth,update)
router.delete("/product/:productId/:userId",requireSignin,isAdmin,isAuth,remove)
router.get('/products',list);
router.get('/products/related/:productId',listRelated);
router.get("/product/photo/:productId", photo);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);

router.param("userId", userById);
router.param("productId", productById);


module.exports = router;  