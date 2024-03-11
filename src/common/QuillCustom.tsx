import React, { RefObject, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { client } from './axios.ts';
import { APIUploadType } from '../type/BoardType.ts';
import { DC } from '../store/ToastStore.ts';

interface QuillStateType {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  fileImg: string;
  setFileImg: (fileImg: string) => void;
}

function QuillCustom({ content, setContent, fileImg, setFileImg }: QuillStateType) {
  const quillRef = useRef(null) as RefObject<ReactQuill>;

  const imageApi = async (img: File): Promise<APIUploadType> => {
    const formData = new FormData();
    formData.append('files', img);
    return client.post('board/upload', formData);
  };

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      if (input.files === null) {
        DC.alert('파일이 준비되지 않았습니다. 다시 시도해 주세요.');
        return;
      }

      if (quillRef.current === null) {
        DC.alert('텍스트 작성기 오류입니다. 새로고침 해주세요.');
        return;
      }

      const file = input.files[0];

      try {
        //이미지 업로드 API
        const res: APIUploadType = await imageApi(file);
        console.log(res);
        const imgUrl = 'http://192.168.10.197:8787/image/' + res.fileImg.split('/image/')[1];
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        if (range === null) {
          DC.alert('텍스트 작성기 오류입니다. 새로고침 해주세요.');
          return;
        }
        editor.insertEmbed(range.index, 'image', imgUrl);
        if (fileImg === '') {
          setFileImg(imgUrl);
        }
        editor.setSelection({ ...range, index: range.index + 1 });
      } catch (error) {
        console.log(error);
      }
    });
  };

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
        handlers: { image: imageHandler },
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
