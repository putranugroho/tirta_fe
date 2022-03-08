import React, {Component} from 'react'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Booking_Room.css';

import RoomItem from './RoomItem'

class Booking_Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            redirect: false,
            ruangan: [1, 2, 3, 4, 5],
            activeRuangan: null,
            services: [],
            detail_service: [],
            total_amount: 0
        };
    }

    componentDidUpdate(prevState){
        this.renderRuangan()
    }
    
    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }
    
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/login' />
        }
    }

    renderCalender = () => {
        const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
          <button className="btn btn-outline-secondary" style={{width: "100%"}} type="button" onClick={onClick} ref={ref}>
            {value}
          </button>
        ));
        return (
          <DatePicker
          selected={this.state.startDate}
          onChange={(date) => this.setState({ startDate: date })}
            customInput={<ExampleCustomInput />}
          />
        );
    };

    handleClick = (index) => {
        if (index === this.state.activeRuangan) {
            this.setState({ activeRuangan: null })
        } else {
            this.setState({ activeRuangan: index })
        }
    }

    handleOnChange = value => {
        let detail_service = this.state.detail_service
        if (value.length) {
            for (let i = 0; i < detail_service.length; i++) {
                if (detail_service[i].id === value[0].id) {
                    if (detail_service[i].count === 1) {
                        this.state.detail_service.splice(i, 1);
                    } else {
                        detail_service[i].count = detail_service[i].count-1
                        detail_service[i].value = parseInt(detail_service[i].value)-parseInt(value[0].value)
                    }
                    break
                }
            }
        } else if (!value.length) {
            if (detail_service.length === 0) {
                value.count = 1
                detail_service.push(value)
            } else {
                let noValue = false
                for (let i = 0; i < detail_service.length; i++) {
                    if (detail_service[i].id === value.id) {
                        noValue = false
                        detail_service[i].count = detail_service[i].count+1
                        detail_service[i].value = parseInt(detail_service[i].value)+parseInt(value.value)
                        break
                    } else {
                        noValue = true
                    }
                }
                if (noValue) {
                    value.count = 1
                    detail_service.push(value)
                }
            }
        }
        var total_amount = 0
        for (let i = 0; i < detail_service.length; i++) {
            total_amount = total_amount + parseInt(detail_service[i].value)
        }
        this.setState({total_amount})
    }

    renderRuangan = () => {
        return this.state.ruangan.map(ruangan => {
            return (
                <RoomItem value={this.state.services} index={ruangan} isDisplay={ this.state.activeRuangan===ruangan } onClick={ this.handleClick } onChange={ this.handleOnChange }/>
            )
        })
    }

    addService = () => this.setState({redirect: true})

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
    }

    renderService = () => {
        if (this.state.detail_service) {
            return this.state.detail_service.map(selected => {
                return (
                    <div>
                        <div className="d-flex navbar py-2">
                            <div>
                                {this.state.startDate.toString().substring(0,15)}
                            </div>
                            <div>
                                {selected.value}
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    render (){
        return (
            <div> 
                <div className='mt-3 row'> 
                    <div className='col-sm-10 mx-auto card'>
                        <div className='card-body'>
                            <div className='border-bottom border-secondary card-title'>
                                <h1>Register</h1>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-12">
                                    {this.renderCalender()}
                                </div>
                            </div>
                            <div className='border-bottom border-secondary card-title'>
                                <h1>Ruangan</h1>
                            </div>
                            {this.renderRuangan()}
                            <div className='border-bottom border-secondary card-title'>
                                <h1>Detail Pesanan</h1>
                            </div>
                            <div className="p-3">
                                {this.renderService()}
                            </div>
                            <button className='btn btn-primary my-3' onClick={this.setRedirect}>
                                Kirim
                            </button>
                            {this.renderRedirect()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Booking_Room