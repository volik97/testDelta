import { useEffect, useState } from "react";
import { getImageToId } from "../services/getImages";
function Modal({id, closeModal}: {id: number, closeModal: (val: null) => void}) {

    const [image, setImage] = useState<{comments: {id:number, author:string, text:string}[], id:number, image:string, largeImage:string } | null>(null)
    const [textComment, setTextComment] = useState('')
    useEffect(() => {
        getImageToId(id).then((res) => setImage(res))
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {value} = event.target;
        setTextComment(value)
    }

    const handleSubmit = () => {
        const id = image!.comments.length + 2
        console.log(id)
        //Возвращает 400
        const request = fetch(`http://test-backend.itdelta.agency/api/image/${image?.id}/comments`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: id, text: textComment})
        }).then((res) => console.log(res))
    }
    return (
    <div onClick={() => closeModal(null)} className="w-full min-h-screen fixed top-0 flex justify-center items-center overflow-scroll p-2 bg-[#6B7280BF]/75 ">
        <div onClick={(event) => event.stopPropagation()} className="bg-white text-sm rounded-[8px] max-w-[692px] p-6 space-y-6 shadow-[0px_10px_10px_-5px_#000000] shadow-[0px_20px_25px_-5px_#000000]">
            {image && <div className="rounded-[20px] overflow-clip"><img className="max-w-[405px] w-full" src={image.largeImage}></img></div>}
            <div className="space-y-2">
            {image?.comments && image.comments.map(comment => 
            <div key={comment.id} className="flex flex-col gap-1">
                <a className={'text-[#374151] font-bold'}>{comment.author}</a>
                <a className={'text-[#6B7280] font-light'}>{comment.text}</a>
            </div>)}
            </div>
            <div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="comment" className="text-[#374151]">Comment</label>
                    <textarea onChange={handleChange} value={textComment} className="border border-gray p-2 rounded-[8px] min-h-[105px]" id='comment'></textarea>
                    <a className="text-[#6B7280]">Write a few sentences about the photo.</a>
                    <button onClick={() => handleSubmit()} className={'w-fit hover:cursor-pointer hover:bg-[#4F46B9] text-white self-center bg-[#4F46E5] rounded-[6px] py-[9px] px-[17px]'}>Save</button>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Modal;