import Tag from "./Tag";

const TagList = (tags) => {
  return (
    <div className="relative inset-0 rounded-full bg-gray-200">
      {tags.length > 0
        ? tags.map((tag) => {
            return <Tag id={tag.id} name={tag.name} />;
          })
        : null}
    </div>
  );
};

export default TagList;
