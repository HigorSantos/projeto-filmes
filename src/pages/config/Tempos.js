import React, {Component} from 'react';

import TempoP from '../../assets/pouco_tempo.svg';
import TempoM from '../../assets/medio_tempo.svg';
import TempoG from '../../assets/grande_tempo.svg';

export function GetTempos() {
    return [
        {
            tempoMax: 90,
            tamanho: 'pequeno',
            img: TempoP,
        },{
            tempoMin: 90,
            tempoMax: 150,
            tamanho: 'medio',
            img: TempoM,
        },{
            tempoMin: 150,
            tamanho: 'grande',
            img: TempoG,
        },
    ];
}

export function TempoMax(tempo){
    return tempo.tempoMax;
}

export function TempoMin(tempo){
    return tempo.tempoMin;
}
export default class CTempo extends Component{
    getHoras = min => {
        let h = Math.floor(min / 60);
        let m = min % 60;
        m = m < 10 ? "0" + m : m;
        return `${h}h ${m}m`;
    };
    handleFunction (callback) {
        if(callback)
            callback();
    }
    render(){
        const tempo = this.props.tempo;
        const exibirImagem =
             this.props.exibirImagem===undefined ? true : this.props.exibirImagem;
        const f = this.props.onClick;

        return(
            <div className={`box-tempo ${tempo.tamanho}`} onClick={()=>this.handleFunction(f)}> 
                {!exibirImagem ? null :
                <img src={tempo.img} alt={tempo.tamanho} />
                }
                <span className={tempo.tamanho}>
                    {tempo.tempoMax ? `Até ` : `Pode ir mais de `}
                    {this.getHoras(tempo.tempoMax||tempo.tempoMin)}
                </span>
            </div>
        );
    }
}
