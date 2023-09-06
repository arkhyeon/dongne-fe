import styled from '@emotion/styled';
import { MutableRefObject, useRef, useState } from 'react';
import TextInput from '../../component/CommonComponents/TextInput';
import { channelList } from '../../../data';
import DongComTalk from '../../component/dongcomtalk/DongComTalk';
import DataList from '../../component/CommonComponents/DataList';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { MainButton, SubButton } from '../../component/CommonComponents/Button';

function PostWrite() {
  const [channel, setChannel] = useState(2);
  const editorRef = useRef() as MutableRefObject<Editor>;

  const insertPost = () => {
    const getPostContent = editorRef?.current?.getInstance().getHTML();
    console.log(getPostContent);
    if (getPostContent === '<p><br></p>') {
      alert('빈 게시글을 등록할 수 없습니다.');
    }
  };

  return (
    <PostWriteWrap>
      <DataList
        id="동커톡"
        labelList={channelList.map(cl => cl.channel)}
        valueList={channelList.map(cl => cl.id.toString())}
        setData={value => setChannel(Number(value))}
        defaultValue={String(channel)}
      />
      <DongComTalk onClick={value => setChannel(value.id)} />
      <TextInput label="제목" />
      <Editor
        ref={editorRef}
        initialValue=" " // 글 수정 시 사용
        placeholder="게시글을 작성해 주세요"
        initialEditType="wysiwyg" // wysiwyg & markdown
        hideModeSwitch={true} // wysiwyg & markdown 변경 버튼
        height="550px"
        usageStatistics={false} // 구글 애널리틱스에 호스트 이름 전송
        toolbarItems={toolbarItems}
        plugins={[colorSyntax]} //text color choice
      />
      <ButtonWrap>
        <SubButton>취소</SubButton>
        <MainButton onClick={insertPost}>작성</MainButton>
      </ButtonWrap>
    </PostWriteWrap>
  );
}

const PostWriteWrap = styled.div`
  width: 1000px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ButtonWrap = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: space-between;
`;

export default PostWrite;

const toolbarItems = [
  ['heading', 'bold', 'italic', 'strike'],
  ['hr'],
  ['ul', 'ol', 'task'],
  ['table', 'link'],
  ['image'],
  ['code'],
  ['scrollSync'],
];
