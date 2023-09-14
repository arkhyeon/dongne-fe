import React, { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';

function QuillCustom({ content, setContent }) {
  const quillRef = useRef();

  // const imageHandler = () => {
  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.click();
  //
  //   input.addEventListener('change', async () => {
  //     const file = input.files[0];
  //
  //     try {
  //       const res = await imageApi({ img: file });
  //       const imgUrl = res.data.imgUrl;
  //       const editor = quillRef.current.getEditor();
  //       const range = editor.getSelection();
  //       editor.insertEmbed(range.index, 'image', imgUrl);
  //       editor.setSelection(range.index + 1);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // };
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          ['clean'],
        ],
        // handlers: { image: imageHandler },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    [],
  );

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];

  return (
    <ReactQuill
      ref={quillRef}
      value={content}
      onChange={setContent}
      modules={modules}
      formats={formats}
      theme="snow"
    />
  );
}

export default QuillCustom;
