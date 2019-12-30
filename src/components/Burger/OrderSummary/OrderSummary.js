import React, { Component } from 'react';
import Aux from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button'
class  orderSummary extends Component{
    componentDidUpdate(){
        console.log('[OrderSummary] DidUpdate')
    }
     ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey=>{
        return (<li key={igKey}>
        <span style={{textTransform:'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]}
        </li>);
    })
    render(){
        return(<Aux>
            <h3>Your Order</h3>
            <p>
             A delicious burger with the following ingredients:
             </p>
             <ul>
                    {this.ingredientSummary}
             </ul>
             <p>The total price is : <strong>{this.props.totalPrice.toFixed(2)}</strong></p>
             <p>Continue to Checkout?</p>
             <Button btnType = "Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
             <Button btnType = "Success" clicked = {this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>);

    }
}
    
    

export default orderSummary;