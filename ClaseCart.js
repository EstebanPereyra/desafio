import fs from 'fs';

export class Cart {
    async getAllProducts(){
        try{
            let data = await fs.promises.readFile('./cart.txt','utf-8');
            let productos = JSON.parse(data);
            return {status:"success",payload:productos}
        }catch (error){
            return {status:"error",message:`Error al obtener los productos. Intente más tarde ${error}`}
        }
    }
    async getProductsById(id){
        try{
            let data = await fs.promises.readFile('./cart.txt','utf-8');
            let productos = JSON.parse(data);
            let producto = productos.find(v => v.id===id)
            if(producto){
                return {status:"success", payload:producto}
            }else{
                return {status:"error",message:"Producto no encontrado"}
            }
        }catch{
            return {status:"error",message:"Error al obtener el producto"}
        }
    }
    async registerProducts(product){
        try{
            let data = await fs.promises.readFile('./cart.txt','utf-8');
            let products = JSON.parse(data);
            let id = products[products.length-1].id+1;
            product = Object.assign({id:id},product);
            products.push(product);
            try{
                await fs.promises.writeFile('./cart.txt',JSON.stringify(products,null,2));
                return {status:"success",message:"Producto añadido correctamente al carrito de compras"}
            }catch{
                return {statis:"error",message:"No se pudo añadir el producto al carrito de compras"} 
            }
        }catch{
            product = Object.assign({id:1},product)
            try{
                await fs.promises.writeFile('./cart.txt',JSON.stringify([product],null,2));
                return {status:"success", message:"Producto añadido correctamente al carrito de compras"}
            }
            catch{
                return {status:"error",message:"No se pudo añadir el producto al carrito de compras"}
            }
        }
    }
    async updateProduct(id,body){
        try{
            let data = await fs.promises.readFile('./cart.txt','utf-8');
            let products = JSON.parse(data);
            if(!products.some(product=>product.id===id)) return {status:"error", message:"No hay ningún producto con el id especificado"}
            let result = products.map(product=>{
                if(product.id===id){
                    body = Object.assign(body,{})
                    body = Object.assign({id:product.id,...body})
                    return body
                }else{
                    return product;
                }
            })
            try{
                await fs.promises.writeFile('./cart.txt',JSON.stringify(result,null,2));
                return {status:"success", message:"Producto actualizado"}
            }catch (error){
                return {status:"error", message:`Error al actualizar el producto ${error}`}
            }
        }catch (error){
            return {status:"error",message:`Error al actualizar el producto ${error}`}
        }
    }
    async deleteProduct(id) {
        try {
            const data = fs.readFileSync('./cart.txt', 'utf-8');
            const productos = JSON.parse(data);
            if(!productos.some(product=>product.id===id)) return {status:"error", message:"No hay ningún Producto con el id proporcionado"}
            //Elimina del array el producto que tenga el id que se pasa como parámetro
            const productosFiltrados = productos.filter(producto => producto.id !== id);
            //Sobreescribir el archivo en formato texto
            await fs.promises.writeFile('./cart.txt', JSON.stringify(productosFiltrados, null, 2));
            return {status:"success",message:"Producto eliminado correctamente"}
        } catch {
            return {status:"error", message:"No se pudo eliminar el producto correctamente"}
        }
    }
    async deleteAllProduct() {
        try {
            const data = fs.readFileSync('./cart.txt', 'utf-8');
            const productos = JSON.parse(data);
            //Elimina del array el producto que tenga el id que se pasa como parámetro
            const productosFiltrados = productos.splice();
            //Sobreescribir el archivo en formato texto
            await fs.promises.writeFile('./cart.txt', JSON.stringify(productosFiltrados, null, 2));
            return {status:"success",message:"Productos eliminados correctamente"}
        } catch {
            return {status:"error", message:"No se pudo eliminar los producto correctamente"}
        }
    }
}

export default Cart;