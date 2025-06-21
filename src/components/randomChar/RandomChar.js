import { Component, useEffect, useState } from 'react';
import MarvelService from '../services/servicMarvel';
import './randomChar.scss';
// import thor from '../../resources/img/thor.jpeg';
import ErrorMessage from '../errorMessage/errorMessage';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/spinner';


const RandomChar =()=> {
    // constructor(props){
    //     super(props)
    // }
    const [char,setChar]=useState({}),
          [loading,setloading]=useState(true),
          [error,setError]=useState(false)



    const marvelservice=new MarvelService();

    useEffect(()=>{
        updateChar();
        const timerId=setInterval(updateChar,15000)
        return ()=>{
            clearInterval(timerId);
        }
    },[])



    const onCharLoaded=(char)=>{
        setChar(char)
        setloading(false)
    }

    const onCharLoading = () => {
        setloading(loading=>true)
    }

    const onError=()=>{
        setloading(false)
        setError(true)
    }


     const updateChar=()=>{
        // this.setState({loading:true})
        const id=Math.floor(Math.random()* (1011400-1011000)+1011000);
        onCharLoading()
        marvelservice
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
     }
    //  updateCharBtn=()=>{
    //     this.setState({loading:true})
    //     this.updateChar()
    //     this.setState({loading:false})
    //  }


        const erroMessage=error?<ErrorMessage/>:null,
            spinner=loading?<Spinner/>:null,
            // spinners=loading?<Spinner/>:null,
            content=!(loading || error)?<View char={char}/>:null

        // if(loading){
        //     return <Spinner/>
        // }

        return (
            <div className="randomchar">
                {erroMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner" onClick={updateChar} >try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }

const View=({char})=>{
    const {name,description,thumbnail,homepage,wiki}=char;
    const NoNamePic= thumbnail==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg '? {'objectFit':"contain"}:null;
    // const a={'color':"red"}
    return(     
        <div className="randomchar__block">
        <img src={thumbnail} alt="Random character" className="randomchar__img" style={NoNamePic}/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {description? description.length>210?`${description.slice(0,210)}...`:description :<span className='DESCPP'>Data wasn't load</span>}</p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
)
}




export default RandomChar;