import React from "react";

import { signout, userInfoSet } from "./service/ApiService";
import { Container, Grid, TextField, Typography, Button, Link } from "@material-ui/core";

function UserInfoSet() {
    const handleSubmit = (event) => {
        event.preventDefault();

        //새로운 데이터 저장
        const data = new FormData(event.target);

        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");

        userInfoSet( {email: email, username: username, password: password} )
            .then(signout()); //다시 로그인 하도록 유도
    };

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            사용자 정보 수정
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="username"
                            name="username"
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="변경할 사용자 이름"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="email"
                            name="email"
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="기존의 이메일 주소"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="current-password"
                            name="password"
                            variant="outlined"
                            required
                            fullWidth
                            id="password"
                            label="기존의 패스워드"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            수정 하기
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="/" variant="body2">
                            돌아가기
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );

};

export default UserInfoSet;