import {useState,useEffect,useRef} from 'react';
// import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types'
import Spinner from '../spinner/spinner';
import MarvelService from '../services/servicMarvel';
import ErrorMessage from '../errorMessage/errorMessage'
import './charList.scss';

const CharList =(props)=>{

    const [charList,setCharList]=useState([]),
          [loading,setloading]=useState(true),
          [error,setError]=useState(false),
          [newitemLoading,setNewitemLoading]=useState(false),
          [offset,setOffset]=useState(210),
          [charended,setCharanded]=useState(false);

    
    const marvelService = new MarvelService();


    useEffect(()=>{
        onRequest();
    },[])

    const onRequest=(offset)=>{
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }


    const onCharListLoading=()=>{
        setNewitemLoading(true)
    }


    const onCharListLoaded = (newCharList) => {
        let ended=false
        if(newCharList<9){
            ended=true
        }

        setCharList(charList=>[...charList,...newCharList]);
        setloading(loading=>false);
        setNewitemLoading(setNewitemLoading=>false);
        setOffset(offset=>offset+9)
        setCharanded(setCharanded=>ended)

    }

    const onError = () => {
        setError(error=>true)
        setloading(loading=>false)
    }


    const itemRefs=useRef([]);

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    
    const focusItem=(id)=>{
        itemRefs.current.forEach(item=>item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected')
        itemRefs.current[id].focus();
    }
    
     function renderItems(arr){
        const items =  arr.map((item,i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    tabIndex={0}
                    ref={el=> itemRefs.current[i]=el}
                    key={item.id}
                    onClick={() => {
                    props.onCharSelector(item.id)
                    focusItem(i)
                }}
                onKeyPress={(e)=>{
                        if(e.key===" " || e.key ==="Enter"){
                            props.onCharSelector(item.id)
                            focusItem(i)
                        }
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
        
        const items = renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                disabled={newitemLoading}
                style={{'display':charended?'none':'block'}}
                onClick={()=>onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )

}

CharList.propTypes={
    // onCharSelector:PropTypes.func.isRequired
    onCharSelector:PropTypes.func.isRequired
}



export default CharList;


// import {Component} from 'react';
// // import Spinner from '../spinner/Spinner';
// import PropTypes from 'prop-types'
// import Spinner from '../spinner/spinner';
// import MarvelService from '../services/servicMarvel';
// import ErrorMessage from '../errorMessage/errorMessage'
// import './charList.scss';

// class CharList extends Component {

//     state = {
//         charList: [],
//         loading: true,
//         error: false,
//         newitemLoading:false,
//         offset:210,
//         charended:false
//     }
    
//     marvelService = new MarvelService();

//     componentDidMount() {
//         this.onRequest()
//     }

//     onRequest=(offset)=>{
//         this.onCharListLoading();
//         this.marvelService.getAllCharacters(offset)
//             .then(this.onCharListLoaded)
//             .catch(this.onError)
//     }


//     onCharListLoading=()=>{
//         this.setState({
//             newitemLoading:true
//         })
//     }


//     onCharListLoaded = (newCharList) => {
//         let ended=false
//         if(newCharList<9){
//             ended=true
//         }


//         this.setState(({offset,charList})=>({
//                 charList:[...charList,...newCharList],
//                 loading: false,
//                 newitemLoading:false,
//                 offset:offset+9,
//                 charended:ended
//         }))
//     }

//     onError = () => {
//         this.setState({
//             error: true,
//             loading: false
//         })
//     }

//     // Этот метод создан для оптимизации, 
//     // чтобы не помещать такую конструкцию в метод render
//     renderItems(arr) {
//         const items =  arr.map((item) => {
//             let imgStyle = {'objectFit' : 'cover'};
//             if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
//                 imgStyle = {'objectFit' : 'unset'};
//             }
            
//             return (
//                 <li 
//                     className="char__item"
//                     key={item.id}
//                     onClick={() => this.props.onCharSelector(item.id)}>
//                         <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
//                         <div className="char__name">{item.name}</div>
//                 </li>
//             )
//         });
//         // А эта конструкция вынесена для центровки спиннера/ошибки
//         return (
//             <ul className="char__grid">
//                 {items}
//             </ul>
//         )
//     }

//     render() {

//         const {charList, loading, error,newitemLoading,offset,charended} = this.state;
        
//         const items = this.renderItems(charList);

//         const errorMessage = error ? <ErrorMessage/> : null;
//         const spinner = loading ? <Spinner/> : null;
//         const content = !(loading || error) ? items : null;

//         return (
//             <div className="char__list">
//                 {errorMessage}
//                 {spinner}
//                 {content}
//                 <button className="button button__main button__long"
//                 disabled={newitemLoading}
//                 style={{'display':charended?'none':'block'}}
//                 onClick={()=>this.onRequest(offset)}>
//                     <div className="inner">load more</div>
//                 </button>
//             </div>
//         )
//     }
// }

// CharList.propTypes={
//     // onCharSelector:PropTypes.func.isRequired
//     onCharSelector:PropTypes.func.isRequired
// }



// export default CharList;