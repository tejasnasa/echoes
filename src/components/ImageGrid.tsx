const ImageGrid = ({ images }: { images: string[] | null }) => {
  if (images?.length === 1)
    return (
      <img
        src={images?.[0]}
        alt=""
        className="mt-2 w-full rounded-2xl overflow-hidden"
      />
    );

  if (images?.length === 2)
    return (
      <div className="w-full flex gap-1.5 mt-2 rounded-2xl overflow-hidden">
        <img src={images?.[0]} alt="" className="w-1/2 object-cover" />
        <img src={images?.[1]} alt="" className="w-1/2 object-cover" />
      </div>
    );

  if (images?.length === 3)
    return (
      <div className="w-full gap-1.5 grid grid-cols-3 grid-rows-2 rounded-2xl overflow-hidden mt-2">
        <img
          src={images?.[0]}
          alt=""
          className="col-span-2 row-span-2 object-cover w-full aspect-square"
        />
        <img
          src={images?.[1]}
          alt=""
          className="col-span-1 object-cover w-full aspect-square"
        />
        <img
          src={images?.[2]}
          alt=""
          className="col-span-1 object-cover w-full aspect-square"
        />
      </div>
    );

  if (images?.length === 4)
    return (
      <div className="w-full gap-1.5 grid grid-cols-2 grid-rows-2 rounded-2xl overflow-hidden mt-2">
        <img src={images?.[0]} alt="" className="col-span-1 object-cover w-full aspect-square" />
        <img src={images?.[1]} alt="" className="col-span-1 object-cover w-full aspect-square" />
        <img src={images?.[2]} alt="" className="col-span-1 object-cover w-full aspect-square" />
        <img src={images?.[3]} alt="" className="col-span-1 object-cover w-full aspect-square" />
      </div>
    );
};

export default ImageGrid;
