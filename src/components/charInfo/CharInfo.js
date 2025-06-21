import { Component, useEffect, useState } from 'react';
import './charInfo.scss';
// import { checkPropTypes } from 'prop-types';
import PropTypes from 'prop-types'
import Spinner from '../spinner/spinner';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/errorMessage';
import MarvelService from '../services/servicMarvel';

const CharInfo =(props)=> {

    const [char,setChar]=useState(null),
          [loading,setloading]=useState(false),
          [error,setError]=useState(false)


    const marvelservice=new MarvelService();

    // useEffect(()=>{
    //     updateChar();
    // },[])

    useEffect(()=>{
        updateChar()
    },[props.charId])


    const updateChar=()=>{
        const {charId}=props

        if(!charId){
            return;
        }
        onCharLoading();

        marvelservice
            .getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError)
    }


     const onCharLoaded=(char)=>{
        setChar(char)
        setloading(false)
    }

    const onCharLoading = () => {
        setloading(true)
    }

    const onError=()=>{
        setloading(false)
        setError(true)
    }

        const skeleton=error||loading||char?null:<Skeleton/>
        const erroMessage=error?<ErrorMessage/>:null,
            spinner=loading?<Spinner/>:null,
            content=!(loading || error || !char)?<View char={char}/>:null
        return (
            <div className="char__info">
                {skeleton}
                {erroMessage}
                {spinner}
                {content}
            </div>
        )
    }

const View=({char})=>{
    const {name,thumbnail,description,homepage,wiki,comics}=char
    const NoNamePic= thumbnail==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg '? {'objectFit':"contain"}:null;
    return(
        <>
            <div className="char__basics">
                    <img src={thumbnail} alt={name} style={NoNamePic}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
{description}                </div>

                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length>0?null:"There no available comics"}
                    {
                        comics.slice(0,10).map((item,i)=>{
                                return(
                                <li className="char__comics-item"
                                key={i}>
                                    {item.name}
                                </li>
                                )
                            }
                        )
                    }

                </ul>
        </>
    )
}

CharInfo.propTypes={
    charId:PropTypes.number
}

export default CharInfo;

// import { Component } from 'react';
// import './charInfo.scss';
// // import { checkPropTypes } from 'prop-types';
// import PropTypes from 'prop-types'
// import Spinner from '../spinner/spinner';
// import Skeleton from '../skeleton/Skeleton';
// import ErrorMessage from '../errorMessage/errorMessage';
// import MarvelService from '../services/servicMarvel';

// class CharInfo extends Component {
//     state={
//         char:null,
//         loading:false,
//         error:false
//     }



//      marvelservice=new MarvelService();

//      componentDidMount(){
//         this.updateChar();
//      }

//      componentDidUpdate(prevProps,pverState){
//         if(this.props.charId !== prevProps.charId){
//             this.updateChar();
//         }
//      }

//     updateChar=()=>{
//         const {charId}=this.props

//         if(!charId){
//             return;
//         }
//         this.onCharLoading();

//         this.marvelservice
//         .getCharacter(charId)
//         .then(this.onCharLoaded)
//         .catch(this.onError)
//     }


//      onCharLoaded=(char)=>{
//         this.setState({
//             char,
//             loading:false
//         })
//     }
//     onCharLoading = () => {
//         this.setState({
//             loading: true
//         })
//     }

//     onError=()=>{
//         this.setState({
//             loading:false,
//             error:true})
//     }

//     render(){
//         const {error,loading,char}=this.state
//         const skeleton=error||loading||char?null:<Skeleton/>
//         const erroMessage=error?<ErrorMessage/>:null,
//             spinner=loading?<Spinner/>:null,
//             content=!(loading || error || !char)?<View char={char}/>:null
//         return (
//             <div className="char__info">
//                 {skeleton}
//                 {erroMessage}
//                 {spinner}
//                 {content}
//             </div>
//         )
//     }


// }
// const View=({char})=>{
//     const {name,thumbnail,description,homepage,wiki,comics}=char
//     const NoNamePic= thumbnail==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg '? {'objectFit':"contain"}:null;
//     return(
//         <>
//             <div className="char__basics">
//                     <img src={thumbnail} alt={name} style={NoNamePic}/>
//                     <div>
//                         <div className="char__info-name">{name}</div>
//                         <div className="char__btns">
//                             <a href={homepage} className="button button__main">
//                                 <div className="inner">homepage</div>
//                             </a>
//                             <a href={wiki} className="button button__secondary">
//                                 <div className="inner">Wiki</div>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="char__descr">
// {description}                </div>

//                 <div className="char__comics">Comics:</div>
//                 <ul className="char__comics-list">
//                     {comics.length>0?null:"There no available comics"}
//                     {
//                         comics.slice(0,10).map((item,i)=>{
//                                 return(
//                                 <li className="char__comics-item"
//                                 key={i}>
//                                     {item.name}
//                                 </li>
//                                 )
//                             }
//                         )
//                     }

//                 </ul>
//         </>
//     )
// }

// CharInfo.propTypes={
//     charId:PropTypes.number
// }

// export default CharInfo;