import stripe from 'stripe';
const stripeInstance = stripe('sk_test_51OQl8fSEmo0kwgrl7T4Ef3E1aQL8EwDOzfItBwRT2wGbaXLr2QzU8k0Naj6H0bFTFbtVuqmge1zPE2wdAgUuWVfs00q67Iyr0N');

const formattedDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };


export const stripePayment = async(req , res) => {
   const {products} = req.body;
   const lineItems = products.map((product) => ({
    price_data:{
        currency:"usd",
        product_data:{
            name: formattedDate(product.slots)
        },
        unit_amount:product.price*100,
    },
    quantity:product.quantity
   }))

   const session = await stripeInstance.checkout.sessions.create({
    payment_method_types:["card"],
    line_items:lineItems,
    mode: "payment",
    success_url:"http://localhost:3000/success",
    cancel_url:"http://localhost:3000/failure"
   });
   res.json({id:session.id})
}