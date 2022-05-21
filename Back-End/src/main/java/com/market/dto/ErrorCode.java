package com.market.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
public enum ErrorCode {
	NON_LOGIN(403, "TOKEN-ERR-403", "NON LOGIN"),
	EXPIRED_TOKEN(403, "TOKEN-ERR-403", "EXPIRED TOKEN"),
	INVALID_TOKEN(403, "TOKEN-ERR-403", "INVAILD TOKEN"),
    NOT_FOUND(404,"COMMON-ERR-404","PAGE NOT FOUND"),
    INTER_SERVER_ERROR(500,"COMMON-ERR-500","INTER SERVER ERROR"),
    EMAIL_DUPLICATION(400,"MEMBER-ERR-400","EMAIL DUPLICATED"),
    ;

    private int status;
    private String code;
    private String message;
}