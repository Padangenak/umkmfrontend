export default ()=>{
	const { URL_API } = useRuntimeConfig().public;
	const { STORAGE_API } = useRuntimeConfig().public;

	const ROUTE_LIST = {
		PRODUCT_GET: `${URL_API}/product/get`,
		PRODUCT_ID: `${URL_API}/product/`,
		PRODUCT_COUNT_POST: `${URL_API}/product/`,
		USER_ID: `${URL_API}/user/`
	}

	return { ROUTE_LIST, STORAGE_API }
}