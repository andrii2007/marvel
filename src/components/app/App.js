import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBounder from "../errorbounder/errorbounder";
import decoration from '../../resources/img/vision.png';

const App =()=> {

    const [SelectedChar,setselectedChar]=useState(null)

    const onSelectorChar=(id)=>{
        setselectedChar(id)
    }

        return (


            
            <div className="app">
                
                <AppHeader/>
                <main>
                    <ErrorBounder>

                    <RandomChar/>
                    </ErrorBounder>
                    <div className="char__content">
                        <ErrorBounder>

                        <CharList onCharSelector={onSelectorChar}/>
                        </ErrorBounder>
                        
                        <ErrorBounder>

                        <CharInfo charId={SelectedChar}/>
                        </ErrorBounder>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div> 
        )
    }

export default App;