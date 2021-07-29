import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class PatientItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            total_amount: 0,
            selected: [],
            isDisplayLab: 'd-none'
        };
    }

    handleClick = () => this.props.onClick(this.props.index)
    
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

    handleOnChange = e => {
        const item = e.target.id;
        const isChecked = e.target.checked;
        const value = e.target.value;

        let service = this.state.selected
        
        if (isChecked === true) {
            let selectedItem = {
                id: item,
                value: value
            }
            service.push(selectedItem)
            this.setState({ total_amount: this.state.total_amount+parseInt(value)})
            this.setState({ selected: service})
            this.props.onChange(selectedItem)
        } else if (isChecked === false) {
            let removeItem = []
            for (let i = 0; i < this.state.selected.length; i++) {
                if (this.state.selected[i].id === item) {
                    removeItem.push(this.state.selected[i])
                    this.state.selected.splice(i, 1);
                }
            }
            this.setState({ total_amount: this.state.total_amount-parseInt(value)})
            this.setState({ selected: service})
            this.props.onChange(removeItem)
        }
    }

    renderService = () => {
        return this.state.selected.map(selected => {
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
        })
    }

    openLab = e => {
        const isChecked = e.target.checked;
        if (isChecked === true) {
            this.setState({ isDisplayLab: 'd-block'})
        } else if (isChecked === false) {
            this.setState({ isDisplayLab: 'd-none'})
        }
    }

    render() {
        return (
            <div className="mb-3"> 
                <button className="btn btn-outline-secondary dropdown-toggle mb-3" type="button" data-bs-toggle="dropdown" style={{width:"100%",textAlign: "left"}} onClick={ this.handleClick }>Pasien {this.props.index}</button>
                <div className={this.props.isDisplay ? 'd-block' : 'd-none'}>
                    <div className='card-title'>
                        <div  style={{fontWeight: "600"}}>Nama Lengkap Sesuai KTP</div>
                    </div>
                    <form className='input-group mb-3'>
                        <input className='form-control' type="text" ref={(input)=>{this.email = input}}/>
                    </form>
                    <div className='card-title'>
                        <div  style={{fontWeight: "600"}}>Pilih Kewarganegaraan</div>
                    </div>
                    <form className='input-group mb-3'>
                        <input className='form-control' type='text' ref={(input)=>{this.alamat = input}}/>
                    </form>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <div className='card-title'>
                                <div  style={{fontWeight: "600"}}>Nomor Paspor</div>
                            </div>
                            <form className='input-group mb-3'>
                                <input className='form-control' type="text" ref={(input)=>{this.email = input}}/>
                            </form>
                        </div>
                        <div className="col-sm-6">
                            <div className='card-title'>
                                <div  style={{fontWeight: "600"}}>Jenis Kelamin</div>
                            </div>
                            <form className='input-group'>
                                <select className="form-select" id="inputGroupSelect01" ref={input => {this.lokasi = input}}>
                                    <option defaultValue>Laki - Laki</option>
                                    <option value="1">Perempuan</option>
                                </select>
                            </form>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <div className='card-title'>
                                <div  style={{fontWeight: "600"}}>Tempat Lahir</div>
                            </div>
                            <form className='input-group'>
                                <input className='form-control' type='text' ref={(input)=>{this.fname = input}}/>
                            </form>
                        </div>
                        <div className="col-sm-6">
                            <div className='card-title'>
                                <div  style={{fontWeight: "600"}}>Tanggal Lahir</div>
                            </div>
                            {this.renderCalender()}
                        </div>
                    </div>
                    <div className='card-title'>
                        <div  style={{fontWeight: "600"}}>Pekerjaan</div>
                    </div>
                    <form className='input-group mb-3'>
                        <input className='form-control' type="text" ref={(input)=>{this.email = input}}/>
                    </form>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <div className='card-title'>
                                <div style={{fontWeight: "600"}}>Provinsi</div>
                            </div>
                            <form className='input-group'>
                                <select className="form-select" id="inputGroupSelect02" ref={input => {this.file = input}}>
                                    <option defaultValue>DKI Jakarta</option>
                                    <option value="1">Jawa</option>
                                    <option value="2">Sumatra</option>
                                    <option value="3">Kalimantan</option>
                                    <option value="4">Sulawesi</option>
                                </select>
                            </form>
                        </div>
                        <div className="col-sm-6">
                            <div className='card-title'>
                                <div style={{fontWeight: "600"}}>Kota</div>
                            </div>
                            <form className='input-group'>
                                <select className="form-select" id="inputGroupSelect03" ref={input => {this.information = input}}>
                                    <option defaultValue>Jakarta</option>
                                    <option value="1">Bogor</option>
                                    <option value="2">Depok</option>
                                    <option value="3">Tanggerang</option>
                                    <option value="4">Bekasi</option>
                                </select>
                            </form>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <div className='card-title'>
                                <div style={{fontWeight: "600"}}>Kecamatan</div>
                            </div>
                            <form className='input-group'>
                                <select className="form-select" id="inputGroupSelect04" ref={input => {this.file = input}}>
                                    <option defaultValue>Antah</option>
                                </select>
                            </form>
                        </div>
                        <div className="col-sm-6">
                            <div className='card-title'>
                                <div style={{fontWeight: "600"}}>Kelurahan</div>
                            </div>
                            <form className='input-group'>
                                <select className="form-select" id="inputGroupSelect05" ref={input => {this.information = input}}>
                                    <option defaultValue>Berantah</option>
                                </select>
                            </form>
                        </div>
                    </div>
                    <div className='card-title'>
                        <div  style={{fontWeight: "600"}}>Alamat</div>
                    </div>
                    <form className='input-group mb-3'>
                        <textarea className="form-control" id="exampleFormControlTextarea2" rows="3" ref={(input)=>{this.note = input}}></textarea>
                    </form>
                    <div className='card-title'>
                        <div  style={{fontWeight: "600"}}>Service</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <div className="form-check">    
                                <input className="form-check-input" type="checkbox" value="1100000" onClick={this.handleOnChange} id="flexCheckChecked1"/>
                                <label className="form-check-label">
                                    Swab PCR Same Day (Rp. 1.100.000)
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="375000" onClick={this.handleOnChange} id="flexCheckChecked2"/>
                                <label className="form-check-label">
                                    Rapid Swab Antigen (Rp. 375.000)
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="475000" onClick={this.handleOnChange} id="flexCheckChecked3"/>
                                <label className="form-check-label">
                                    Tes Serologi (Rp. 475.000)
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="150000" onClick={this.handleOnChange} id="flexCheckChecked4"/>
                                <label className="form-check-label">
                                    Rapid Text Antibody (Rp. 150.000)
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="900000" onClick={this.handleOnChange} id="flexCheckChecked5"/>
                                <label className="form-check-label">
                                    Swab PCR H+1 (Rp. 900.000)
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" onClick={this.openLab} id="flexCheckChecked6"/>
                                <label className="form-check-label">
                                    Laboratorium
                                </label>
                            </div>
                            <div className={this.state.isDisplayLab}>
                                <div style={{marginLeft: "50px"}}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="500000" onClick={this.handleOnChange} id="flexCheckChecked7"/>
                                        <label className="form-check-label">
                                            Laboratorium 1 (Rp. 500.000)
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="70000" onClick={this.handleOnChange} id="flexCheckChecked8"/>
                                        <label className="form-check-label">
                                            Laboratorium 2 (Rp. 70.000)
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="800000" onClick={this.handleOnChange} id="flexCheckChecked9"/>
                                        <label className="form-check-label">
                                            Laboratorium 3 (Rp. 800.000)
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="150000" onClick={this.handleOnChange} id="flexCheckChecked10"/>
                                        <label className="form-check-label">
                                            Laboratorium 4 (Rp. 150.000)
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="1000000" onClick={this.handleOnChange} id="flexCheckChecked11"/>
                                        <label className="form-check-label">
                                            Laboratorium 5 (Rp. 1.000.000)
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="720000" onClick={this.handleOnChange} id="flexCheckChecked12"/>
                                        <label className="form-check-label">
                                            Laboratorium 6 (Rp. 720.000)
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="250000" onClick={this.handleOnChange} id="flexCheckChecked13"/>
                                        <label className="form-check-label">
                                            Laboratorium 7 (Rp. 250.000)
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card-title'>
                        <div  style={{fontWeight: "600"}}>Have you been tested Positive COVID-19?</div>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="exampleRadios1" id="exampleRadios1" value="option1"/>
                        <label className="form-check-label">
                            Yes
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="exampleRadios1" id="exampleRadios2" value="option2"/>
                        <label className="form-check-label">
                            No
                        </label>
                    </div>
                    <div className='card-title'>
                        <div style={{fontWeight: "600"}}>Have you been in contact with COVID-19 patient?</div>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="exampleRadios2" id="exampleRadios3" value="option1"/>
                        <label className="form-check-label">
                            Yes
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="exampleRadios2" id="exampleRadios4" value="option2"/>
                        <label className="form-check-label">
                            No
                        </label>
                    </div>
                    <div style={{backgroundColor: "#ced4da"}} className="p-3">
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
                </div>
            </div>
        )
    }
}

export default PatientItem