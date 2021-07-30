import React, {Component} from 'react'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'
import DatePicker from "react-datepicker";

import PatientItem from './PatientItem'
import "react-datepicker/dist/react-datepicker.css";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            redirect: false,
            pasien: [1],
            activePasien: null,
            services: [],
            detail_service: [],
            total_amount: 0
        };
    }

    componentDidUpdate(prevState){
        this.renderPasien()
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
          <button className="btn btn-outline-secondary" type="button" onClick={onClick} ref={ref}>
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
        if (index === this.state.activePasien) {
            this.setState({ activePasien: null })
        } else {
            this.setState({ activePasien: index })
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

    renderPasien = () => {
        return this.state.pasien.map(pasien => {
            return (
                <PatientItem value={this.state.services} index={pasien} isDisplay={ this.state.activePasien===pasien } onClick={ this.handleClick } onChange={ this.handleOnChange }/>
            )
        })
    }

    addPasien = () => {
        let newPasien = []
        let addPasien = this.state.pasien.length+1
        for (let i = 1; i <= addPasien; i++) {
            newPasien.push(i)
        }
        this.setState({ pasien: newPasien})
    }

    addService = () => this.setState({redirect: true})

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/history' />
        }
    }

    renderService = () => {
        if (this.state.detail_service) {
            return this.state.detail_service.map(selected => {
                if (selected.count > 1) {
                    return (
                        <div className="d-flex navbar border-bottom border-secondary py-2">
                            <div>
                                {selected.id}
                            </div>
                            <div>
                                X {selected.count}
                            </div>
                            <div>
                                {selected.value}
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="d-flex navbar border-bottom border-secondary py-2">
                            <div>
                                {selected.id}
                            </div>
                            <div>
                                {selected.value}
                            </div>
                        </div>
                    )
                }
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
                                <div className="col-sm-6">
                                    <div className='card-title'>
                                        <div  style={{fontWeight: "600"}}>Pilih Lokasi</div>
                                    </div>
                                    <form className='input-group'>
                                        <select className="form-select" id="inputGroupSelect06" ref={input => {this.lokasi = input}}>
                                            <option defaultValue>Tirta Bellagio</option>
                                            <option value="1">Tirta One</option>
                                            <option value="2">Tirta Two</option>
                                            <option value="3">Tirta Three</option>
                                        </select>
                                    </form>
                                </div>
                                <div className="col-sm-6">
                                    <div className='card-title'>
                                        <div  style={{fontWeight: "600"}}>Tanggal Home Care</div>
                                    </div>
                                    {this.renderCalender()}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-6">
                                    <div className='card-title'>
                                        <div  style={{fontWeight: "600"}}>Nama PIC</div>
                                    </div>
                                    <form className='input-group'>
                                        <input className='form-control' type='text' ref={(input)=>{this.fname = input}}/>
                                    </form>
                                </div>
                                <div className="col-sm-6">
                                    <div className='card-title'>
                                        <div  style={{fontWeight: "600"}}>No Handphone</div>
                                    </div>
                                    <form className='input-group'>
                                        <input className='form-control' type='text' ref={(input)=>{this.no_hp = input}}/>
                                    </form>
                                </div>
                            </div>
                            <div className='card-title'>
                                <div  style={{fontWeight: "600"}}>Email</div>
                            </div>
                            <form className='input-group mb-3'>
                                <input className='form-control' type="email" ref={(input)=>{this.email = input}}/>
                            </form>
                            <div className='card-title'>
                                <div  style={{fontWeight: "600"}}>Alamat Lokasi Home Care</div>
                            </div>
                            <form className='input-group mb-3'>
                                <input className='form-control' type='text' ref={(input)=>{this.alamat = input}}/>
                            </form>
                            <div className="row mb-3">
                                <div className="col-sm-6">
                                    <div className='card-title'>
                                        <div style={{fontWeight: "600"}}>Apakah Anda memerlukan Hard Copy? (dapat diambil di klinik)</div>
                                    </div>
                                    <form className='input-group'>
                                        <select className="form-select" id="inputGroupSelect07" ref={input => {this.file = input}}>
                                            <option defaultValue>Hanya Softcopy</option>
                                            <option value="1">Hanya Hardcopy</option>
                                            <option value="2">Hardcopy dan Softcopy</option>
                                        </select>
                                    </form>
                                </div>
                                <div className="col-sm-6">
                                    <div className='card-title'>
                                        <div style={{fontWeight: "600"}}>Dari mana Anda mendapatkan informasi mengenai layanan?</div>
                                    </div>
                                    <form className='input-group'>
                                        <select className="form-select" id="inputGroupSelect08" ref={input => {this.information = input}}>
                                            <option defaultValue>Instagram</option>
                                            <option value="1">Facebook</option>
                                            <option value="2">Twitter</option>
                                            <option value="3">Website</option>
                                        </select>
                                    </form>
                                </div>
                            </div>
                            <div className='card-title'>
                                <div style={{fontWeight: "600"}}>Note</div>
                            </div>
                            <form className='input-group mb-3'>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" ref={(input)=>{this.note = input}}></textarea>
                            </form>
                            <div className='border-bottom border-secondary card-title'>
                                <h1>Pasien</h1>
                            </div>
                            {this.renderPasien()}
                            <button className='btn btn-primary my-3' onClick={this.addPasien}>
                                Tambah Pasien
                            </button>
                            <div className='border-bottom border-secondary card-title'>
                                <h1>Detail Pesanan</h1>
                            </div>
                            <div className="p-3">
                                {this.renderService()}
                                <div className="d-flex navbar py-2">
                                    <div>
                                        Total Amount
                                    </div>
                                    <div>
                                        {this.state.total_amount}
                                    </div>
                                </div>
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

export default Register