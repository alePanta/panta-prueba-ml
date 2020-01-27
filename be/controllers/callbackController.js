import request from 'request';

class CallbackController {
    constructor(){
        // API endpoints
        this.URL_PRODUCT_DETAIL = 'https://api.mercadolibre.com/items/';
        this.URL_SEARCH = 'https://api.mercadolibre.com/sites/MLA/search?q=';
        
        // Firma
        this.NAME = 'Alejandro';
        this.LASTNAME = 'Panta';
    } 

    getSearch = (req, res) => {
        if (req.headers['name'] === this.NAME && req.headers['lastname'] === this.LASTNAME) {
            const query = req.query.q;
            if (res.status(200)) {
                request(`${this.URL_SEARCH + query}`, (error, response, body) => {
                    if (!error) {
                        body = JSON.parse(body);
                        const data = {
                            "author": this.generateAuthor(req.headers['name'], req.headers['lastname']),
                            "categories": this.generateCategories(body),
                            "items": this.generateItems(body, false, '')
                        }
                        res.send(data)
                    } else {
                        console.log(error);
                    }
                })
            }
            
        } else {
            res.status(401).send({
                ok: false,
                message: 'Firma inválida'
            })
        }
    }
    
    getDetail = (req, res) => {
        if (req.headers['name'] === this.NAME && req.headers['lastname'] === this.LASTNAME) {
            const id = req.params.id;
            request(`${this.URL_PRODUCT_DETAIL + id}`, (error, response, body) => {
                if (!error) {
                    const detailBody = JSON.parse(body);
                    request(`${this.URL_PRODUCT_DETAIL + id}/description`, (error, response, body) => {
                        if (!error) {
                            body = JSON.parse(body);
                            const data = {
                                "author": this.generateAuthor(req.headers['name'], req.headers['lastname']),
                                "items": this.generateItems(detailBody, true, body.plain_text)
                            }
                            res.send(data)
                        } else {
                            console.log(error);
                        }
                    }
                    );
                } else {
                    console.log(error);
                }
            })
        }
    }

    /**
     * Genera la propiedad author de los json de respuesta
     * @param {string} name 
     * @param {string} lastname
     */
    generateAuthor(name, lastname) {
        return {
            "name": name,
            "lastname": lastname
        };
    }

    /**
     * Genera la propiedad categories del json de respuesta en la pantalla 'resultado de búsqueda'
     * @param {object} body 
     */
    generateCategories(body) {
        let categories = [];

        if (body.filters.length) {
            body.filters[0]['values'][0]['path_from_root'].forEach(elePath => {
                categories.push(elePath.name);
            });
        }

        return categories;
    }

    /**
     * Genera la propiedad items del json de respuesta
     * @param {object} body - El json con la información
     * @param {boolean} itemDetail - Determina si el métodoso se usa para 'vista detalle' o 'resultado de búsqueda'
     * @param {string} description - La descripción del producto 
     */
    generateItems(body, itemDetail, description) {
        if (!itemDetail) { // Si es 'resultado de búsqueda'
            const results = [];
            if (body.results.length) {
                body.results.slice(0, 4).forEach(eleResult => {
                    results.push(this.itemsBody(eleResult, false, description));
                });
            }
            return results;
        } else { // Si es la 'vista detalle'
            return this.itemsBody(body, true, description);
        }
    }

    /** 
     * Genera el cuerpo de la propiedad 'item' tanto para la 'pantalla de búsqueda' como para la 'vista detalle'
     * @param {object} eleResult 
     * @param {boolean} itemDetail 
     * @param {string} description 
     */
    itemsBody(eleResult, itemDetail, description) {
        // console.log(eleResult);
        if (eleResult.error) { // Si el detalle del producto devuelve error
            return eleResult;    
        } else { // Si el detalle del producto devuelve todo ok
            const item = {
                "id": eleResult.id,
                "title": eleResult.title,
                "price": {
                    "currency": eleResult.currency_id,
                    "amount": eleResult.price,
                    "decimals": 0
                },
                "picture": itemDetail ? eleResult.pictures[0].url : eleResult.thumbnail,
                "condition": eleResult.condition,
                "free_shipping": eleResult.shipping.free_shipping
            };

            // Si es 'vista detalle' agregar las propiedades 'sold_quantity' y 'description' a la propiedad 'items' del json de respuesta
            if (itemDetail) {
                item.sold_quantity = eleResult.sold_quantity;
                item.description = description;
            }
            return item;
        }
    }
}

const callbackController = new CallbackController();
export default callbackController;
