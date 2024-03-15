import { useEffect, useState } from "react";
import {getImages} from './services/getImages'
import Modal from './components/Modal'
export interface IImage {
  id: number, image: string
}

function App() {
  const [images, setImages] = useState<null | IImage[]>(null)
  const [modalIsOpen, setModalIsOpen] = useState<null | number>(null)

  useEffect(() => {
    getImages().then((res) => setImages(res))
  }, [])

  return (<>
    <section className='grid grid-cols-3 p-10 gap-10'> 
      {images && images.map(image => <div  key={image.id} className="flex flex-col"><img onClick={() => setModalIsOpen(image.id)} className="hover:cursor-pointer hover:scale-[1.01]" src={image.image}></img><figcaption>{image.id}</figcaption></div>)}
    </section>
    {modalIsOpen && <Modal id={modalIsOpen} closeModal={setModalIsOpen}/>}
    </>
  );
}

export default App;
