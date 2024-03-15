export const getImages = async () => {
    const data = await fetch('http://test-backend.itdelta.agency/api/images')
    const images = data.json()
    return images
}

export const getImageToId = async (id:number) => {
    const data = await fetch(`http://test-backend.itdelta.agency/api/image/${id}`)
    const images = data.json()
    return images
}