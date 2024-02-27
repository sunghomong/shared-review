// 게시물 테이블
package com.sreview.sharedReview.domain.board.entity;

import com.sreview.sharedReview.domain.board.dto.PostDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.*;

@Entity // 엔티티로 사용하겠다
@Getter // 객체의 필드 값을 반환하는 역할
@Setter
@NoArgsConstructor // JPA는 엔티티를 생성할 때 기본 생성자를 사용. 매개변수가 없는 기본 생성자를 생성
@AllArgsConstructor // 해당 클래스에 모든 필드를 매개변수로 받는 생성자를 자동으로 생성
public class PostEntity { // 게시물 테이블
    // 게시물 ID
    @Id
    @GeneratedValue
    @Column(name = "Post_ID")
    private Long postId;

    // 유저 ID
    // User테이블 User_ID 외래키
    //    // 다(Posts)대일(Users) 관계
<<<<<<< HEAD:sharedReview/src/main/java/com/sreview/sharedReview/domain/board/entity/PostEntity.java
    @ManyToOne
    @JoinColumn(name = "User_ID")
    private Long userId;
=======
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "Users_ID")
    private User user;
>>>>>>> 4885e4d025715ab12e2988cda83fc92025a5e4f8:sharedReview/src/main/java/com/sreview/sharedReview/domain/board/entity/Post.java

    // 게시물 제목
    @Column(name = "Post_Title")
    private String title;

    // 게시물 내용
    @Column(name = "Post_Content")
    private String content;

    // 게시물 조회수
    @Column(name = "Post_ViewsCount")
<<<<<<< HEAD:sharedReview/src/main/java/com/sreview/sharedReview/domain/board/entity/PostEntity.java
    private Long viewsCount;
=======
    private int viewsCount;
>>>>>>> 4885e4d025715ab12e2988cda83fc92025a5e4f8:sharedReview/src/main/java/com/sreview/sharedReview/domain/board/entity/Post.java

    // 게시물 작성 날짜
    @Column(name = "Post_CreatedAt")
    private LocalDateTime createdAt;

    // 게시물 수정 날짜
    @Column(name = "Post_EditDate")
    private LocalDateTime editDate;

<<<<<<< HEAD:sharedReview/src/main/java/com/sreview/sharedReview/domain/board/entity/PostEntity.java

    // PostServiceImpl.java에서 BeanUtils.copyProperties(postDTO, post);로 엔티티 객체로 변환해준거 같아서 일단 주석 처리함
//    public static PostEntity toSaveEntity(PostDTO postDTO) {
//        PostEntity postEntity = new PostEntity();
//        postEntity.setPostId(postDTO.getPostId());
//        postEntity.setUserId(postDTO.getUserId());
//
//        postEntity.setTitle(postDTO.getPostTitle());
//        postEntity.setContent(postDTO.getPostContent());
//        postEntity.setViewsCount(postDTO.getViews());
//        postEntity.setCreatedAt(postDTO.getPostCreatedAt());
//        postEntity.setEditDate(postDTO.getPostEditDate());
//        return postEntity;
//    }

//    // 게시물 좋아요
//    @Column(name = "Post_LikesCount")
//    private int likesCount;
=======
    // 게시물 좋아요
    @OneToMany(mappedBy = "like", cascade = CascadeType.ALL)
    private List<Like> likes = new ArrayList<>();

    // img
    @OneToMany(mappedBy = "image", cascade = CascadeType.ALL)
    private List<Image> images = new ArrayList<>();

    @OneToMany(mappedBy = "comments",cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @OneToOne(fetch = LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "Categorie_ID")
    private Categorie categorie;

>>>>>>> 4885e4d025715ab12e2988cda83fc92025a5e4f8:sharedReview/src/main/java/com/sreview/sharedReview/domain/board/entity/Post.java

}
