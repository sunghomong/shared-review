import "@toast-ui/editor/dist/toastui-editor.css";
import "./style.css";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Editor } from "@toast-ui/react-editor";
import { getCategorysReqeust, postBoard } from "../../apis";
import {
  GetCategorysResponseDto,
  PostBoardWriteResponseDto,
} from "../../apis/response/board";
import ResponseDto from "../../apis/response/response.dto";
import { Category } from "../../types/interface";
import { BoardWriteRequestDto } from "../../apis/request/board";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { BOARD_DETAIL, MAIN_PATH } from "../../constant";

const BoardWrite = () => {
  const [cookies, seetCookies] = useCookies();
  const navigator = useNavigate();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const tagRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState<string>("");
  const [categoryDrop, setCategoryDrop] = useState(false);
  const [category, setCategory] = useState<Category | undefined>();
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [contentHtml, setContentHtml] = useState<string>();
  const [contentMarkdown, setContentMarkdown] = useState<string>();

  const [titleError, setTitleError] = useState<boolean>(false);
  const [contentError, setContentError] = useState<boolean>(false);

  // Effect: 처음 렌더링 시 카테고리를 가져와줌.
  useEffect(() => {
    getCategorysReqeust().then(getCategorysResponse);
  }, []);
  const getCategorysResponse = (
    responseBody: GetCategorysResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) {
      alert("서버로부터 응답이 없습니다.");
      return;
    }
    const { code } = responseBody;
    if (code === "VF") alert("유효성 검사 실패");
    if (code === "DBE") alert("데이터베이스 오류");
    if (code !== "SU") {
      return;
    }
    const result = responseBody as GetCategorysResponseDto;
    setCategorys(result.categorys);
  };

  const toggleDropdown = () => {
    setCategoryDrop(!categoryDrop);
  };

  const editorRef = useRef<Editor>(null);
  const searchInputRef = useRef<any>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      categoryDrop &&
      searchInputRef.current &&
      !searchInputRef.current.contains(e.target as Node)
    ) {
      setCategoryDrop(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [categoryDrop]);
  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
    setTitleError(false);
  };
  const onContentChange = () => {
    // 에디터 내용 content
    setContentHtml(editorRef.current?.getInstance().getHTML());
    setContentMarkdown(editorRef.current?.getInstance().getMarkdown());
    setContentError(false);
  };

  // 작성 버튼 클릭
  const onSubmit = () => {
    const content2 = editorRef.current?.getInstance().getMarkdown();
    if (!title) {
      titleRef.current?.focus();
      setTitleError(true);
    }
    if (!content2) {
      editorRef.current?.getInstance().focus();
      setContentError(true);
    }
    if (titleError || contentError) {
      return;
    }
    const content = editorRef.current?.getInstance().getHTML();
    const reqeustBody: BoardWriteRequestDto = {
      title,
      contentHtml,
      contentMarkdown,
      category,
      tags,
    };
    postBoard(reqeustBody, cookies.accessToken).then(postResponse);
  };
  const postResponse = (
    responseBody: PostBoardWriteResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) {
      alert("서버로부터 응답이 없습니다.");
      return;
    }
    const { code } = responseBody;
    if (code === "VF") alert("유효성 검사 실패");
    if (code === "DBE") alert("데이터베이스 오류");
    if (code === "NU") alert("회원 정보 확인");
    if (code !== "SU") {
      return;
    }
    const { boardId } = responseBody as PostBoardWriteResponseDto;
    navigator(BOARD_DETAIL(boardId));
  };
  // event handler:  Tag
  const tagKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if ((event.key === "Enter" || event.key === "Tab") && tag.length !== 0) {
      const newTags = [...tags];
      newTags.push(tag);
      setTags(newTags);
    }
  };
  const onTagChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTag(value);
    tagRef.current?.focus();
  };
  return (
    <div id="board-write-wrap">
      <div className="board-write-top">
        <div className="board-title">게시물 작성</div>

        <div className="function-line">
          <div className="board-category" ref={searchInputRef}>
            <div className="board-dropdown-box" onClick={toggleDropdown}>
              <div className="board-dropdown-text">카테고리</div>
              <div className="board-dropdown-icon"></div>
            </div>
            {categoryDrop && (
              <div className="board-dropdown-content">
                {categorys.map(
                  (
                    category,
                    index // 카테고리 목록 불러오기.
                  ) => (
                    <div
                      className="board-dropdown-content-item"
                      onClick={() => {}}
                    >
                      {category.categoryName}
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          <div className="board-registered" onClick={onSubmit}>
            {"등록"}
          </div>
        </div>
      </div>
      <div className="board-write-mid">
        <div className="board-main-left">
          <div className="board-input-title">
            <input
              type="text"
              placeholder="제목을 입력해주세요."
              ref={titleRef}
              onChange={onTitleChange}
            />
          </div>
          <div className="editor_box">
            <Editor
              ref={editorRef}
              initialValue="hello react editor world!"
              previewStyle="vertical"
              height="600px"
              onChange={onContentChange}
              initialEditType="wysiwyg"
              useCommandShortcut={false}
            />
          </div>
          <div className="board-main">
            <div className="board-detail"></div>
            <div className="board-attach"></div>
          </div>
        </div>
      </div>

      <div className="board-write-bottom">
        <div className="board-bottom-tag">
          {tags.map((t, index) => (
            <div>
              <div className="tag">#{t}</div>
              <div className="dd" onClick={() => {}}>
                X
              </div>
            </div>
          ))}
          <input
            type="text"
            placeholder="태그를 입력해주세요"
            onKeyDown={tagKeyDown}
            onChange={onTagChange}
            ref={tagRef}
          />
        </div>
      </div>
    </div>
  );
};

export default BoardWrite;
