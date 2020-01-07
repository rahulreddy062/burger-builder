import React, { Component } from "react";
import Aux from "../../hoc/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing:false,
    loading:false
  };
  componentDidMount(){
    axios.get('https://burger-builder-691c3.firebaseio.com/ingredients.json')
    .then(response=>{
      this.setState({ingredients:response.data});
    })
  }
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceRemoval = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceRemoval;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };
  purchaseHandler=()=>{
      this.setState({purchasing:true});
  }
  purchaseCancleHandler = ()=>{
      this.setState({purchasing:false});
  }
  purchaseContinueHandler = () =>{
    this.setState({loading:true})
      // alert('You continue');
      const order = {
        ingredients:this.state.ingredients,
        price:this.state.totalPrice,
        customer:{
          name:'Rahul',
          address:{
            street:'Great Maedow dr',
            zipCode:'34543',
            country:'USA'
          },
          email:'tesst@test.com'
        },
        deliveryMethod:'fastest'
      }
      axios.post('/orders.json',order)
      .then(response=>{
        this.setState({loading:false,purchasing:false})
      })
      .catch(error=>{
        this.setState({loading:false,purchasing:false})
      });


  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    
    let burger = <Spinner/>
    if(this.state.ingredients){
      burger = (
        <Aux>
      <Burger ingredients={this.state.ingredients} />
         <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered = {this.purchaseHandler}
          />
          </Aux>);
          orderSummary = <OrderSummary
          ingredients = {this.state.ingredients}
          totalPrice = {this.state.totalPrice}
          purchaseCancelled = {this.purchaseCancleHandler}
          purchaseContinued = {this.purchaseContinueHandler}/>
          
    }
    if(this.state.loading){
      orderSummary = <Spinner/>
    }
     
    return (
      <Aux>
      <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancleHandler}>
          {orderSummary}
      </Modal>
      {burger}
      </Aux>
    );
  }
}
export default BurgerBuilder;
