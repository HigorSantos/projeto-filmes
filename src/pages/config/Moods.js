import React, {Component} from 'react';

import MTranquilo from '../../assets/m_tranquilo.svg';
import MGRudarCadeira from '../../assets/m_grudar_cadeira2.svg';
import MNinjasCebola from '../../assets/m_ninjas_cebola.svg';
import MGentePreta from '../../assets/m_gente_preta.svg';

export function GetMoods() {
    return [
        {
            id:1, 
            mood:'Tranquilo',
            //Aventura, Comedia, Familia, Romance
            pesquisar:[12,35,10751,10749],
            //Crime, Drama, Terror,Thriller, Guerra, Ficcção cientifica
            nao_pesquisar:[80,18,27,53,10752,878],
            img:MTranquilo,
            params:{
                'certification.lte':14,
                certification_country:'BR'
            }
        },
        {
            id:2,
            mood:'Grudar na Cadeira',
            //Thriller, Crime, Ficção Cientifica, Guerra, Terro
            pesquisar:[53,80,878,10752,27],
            //Comedia, Terror
            nao_pesquisar:[35,37],
            img:MGRudarCadeira,
            params:{
                without_keywords:[4776,6844,4379,10051].join("|"),
            },
        },
        {
            id:3,
            mood:'Ninjas Cortadores de Cebola',
            //Documentario, Animação, Familia, Drama
            pesquisar:[99,16,10751,18],
            //Comedia, Aventura
            nao_pesquisar:[35,12],
            img:MNinjasCebola,
            params:{
                with_keywords:[697],/*1430,3206,3737 */
            },
        },
        {
            id:4,
            mood:'Quero ver Gente preta',
            pesquisar:[99,16,10751,18],
            nao_pesquisar:[35,12],
            img:MGentePreta,
            params:{
                with_keywords:[697],/*1430,3206,3737 */
            },
        },
    ];
}

export function MoodPesquisar(mood){
    return (mood.pesquisar||[]).join("|");
}

export function MoodNaoPesquisar(mood){
    return (mood.nao_pesquisar||[]).join(",");
}

export default class CMood extends Component{
    handleClick (callback) {
        if(callback)
            callback();
    }
    render(){
        const mood = this.props.mood;
        const exibirImagem =
             this.props.exibirImagem===undefined ? true : this.props.exibirImagem;
        const f = this.props.onClick;

        return(
        <div className="box-mood" 
                onClick={()=>this.handleClick(f)}> 
           {!exibirImagem ? null :
               <img src={mood.img} alt={mood.mood} />
            }
            <span>{mood.mood}</span>
        </div>
        );
    }
}
