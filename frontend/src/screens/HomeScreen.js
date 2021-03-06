import React, { useEffect } from 'react'
import {Link} from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
const HomeScreen = ({ match }) => {

    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;


    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages } = productList;
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
        console.log(productList);
    }, [dispatch, keyword, pageNumber])

    return (
        <div style={{marginTop:'110px'}} >
            <Meta title="Welcome to E-Shop | Home" />
            {!keyword ? <ProductCarousel /> : <Link to='/' className="btn btn-light">Go Back</Link> }
            <h1>Latest Products</h1>
            {
                loading ? <Loader /> : error ? <Message variant='danger' >{error}</Message> :
                    <>
                        <Row>
                            {
                                products && products.map(product => (
                                    <Col sm={12} md={6} lg={4} xl={3} key={product._id} >
                                        <Product product={product} />
                                    </Col>
                                ))
                            }
                            {
                                products && products.length === 0 && <h2>No Result Found...</h2>
                            }
                        </Row>
                        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                    </>
            }
        </div>
    )
}

export default HomeScreen;