import request from 'supertest';
import app from '../../app';

jest.setTimeout(50000)

describe('Product Controllers', () => {

  it('should get all products | GET /products ', async () => {

    const res = await request(app).get('/products?priceFrom=100&priceTo=200&orderDirection=asc');
    expect(res.status).toEqual(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0)
  });
  

  it('should get one product | GET products/:id', async () => {
    const testProduct = await request(app).post('/products').send({name:'test', price:100, type:'burger', ingredients:['test']});

    const res = await request(app).get(`/products/${testProduct.body.id}`);
    
    expect(res.status).toEqual(200)
    expect(res.body._id).toEqual(testProduct.body.id)
    const cleanerDb = await request(app).delete(`/products/${testProduct.body.id}`)
  });
  
  it('should update one product | PUT /products', async () => {
    const testProduct = await request(app).post('/products').send({name:'test', price:100, type:'burger', ingredients:['test']});
    
    const res = await request(app).put('/products').send({_id:testProduct.body.id, name:'new name'});
    expect(res.status).toEqual(200)
    expect(res.body.id).toEqual(testProduct.body.id)
    const cleanerDb = await request(app).delete(`/products/${testProduct.body.id}`)

  });

  it('should delete one product | DELETE /products/:id', async () => {
    const testProduct = await request(app).post(`/products`).send({name:'test', price:100, type:'burger', ingredients:['test']});
    const res = await request(app).delete(`/products/${testProduct.body.id}`)
    expect(res.status).toEqual(200)
    expect(res.body._id).toEqual(testProduct.body.id)
  });

});
 