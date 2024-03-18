import axios from './instance';

const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAF fnPldd8QzWvgVQ'

export const getOrders = async () => {
  const res = await axios.get('/orders', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return res.data.orders;
}

export const getOrder = async (id) => {
  const res = await axios.get(`/orders/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return res.data.order;
}