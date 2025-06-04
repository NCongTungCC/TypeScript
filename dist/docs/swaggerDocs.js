"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paths = void 0;
exports.paths = {
    '/signup': {
        post: {
            tags: ['Authentication'],
            summary: 'Đăng ký',
            description: 'Đăng ký tài khoản',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                username: {
                                    type: 'string',
                                    example: 'congtung'
                                },
                                email: {
                                    type: 'string',
                                    example: 'tung@gmail.com'
                                },
                                password: {
                                    type: 'string',
                                    example: '123456'
                                },
                                avatar: {
                                    type: 'string',
                                    example: 'tung.jpg'
                                },
                                gender: {
                                    type: 'string',
                                    example: 'male'
                                },
                                birthday: {
                                    type: 'string',
                                    format: 'date',
                                    example: '2002-02-01'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Đăng ký thành công',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 201
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Đăng ký thành công'
                                    },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            username: {
                                                type: 'string',
                                                example: 'congtung'
                                            },
                                            email: {
                                                type: 'string',
                                                example: 'tung@gmail.com'
                                            },
                                            password: {
                                                type: 'string',
                                                example: '123456'
                                            },
                                            avatar: {
                                                type: 'string',
                                                example: 'tung.jpg'
                                            },
                                            gender: {
                                                type: 'string',
                                                example: 'male'
                                            },
                                            birthday: {
                                                type: 'string',
                                                format: 'date',
                                                example: '2002-02-01'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: 'Email đã tồn tại',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 400
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Email đã được sử dụng'
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: 'Lỗi máy chủ',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 500
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Đã xảy ra lỗi phía máy chủ'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/login': {
        post: {
            tags: ['Authentication'],
            summary: 'Đăng nhập',
            description: 'Đăng nhập tài khoản',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: {
                                    type: 'string',
                                    example: 'tung@gmail.com'
                                },
                                password: {
                                    type: 'string',
                                    example: '123456'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Đăng nhập thành công',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 200
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Đăng nhập thành công'
                                    },
                                    accessToken: {
                                        type: 'string',
                                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6InVzZXIiLCJpYXQiOjE3NDg4MzAxODIsImV4cCI6MTc0ODgzMTk4Mn0.CCq45tW-6ND-c1Fafejj9C87q_wOBxCCZjr7EY0W_wo'
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: 'Sai tài khoản mật khẩu',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 400
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Sai tài khoản mật khẩu'
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: 'Không tìm thấy tài khoản',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 404
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Không tìm thấy email'
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: 'Lỗi máy chủ',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 500
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Đã xảy ra lỗi phía máy chủ'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/logout': {
        get: {
            tags: ['Authentication'],
            summary: 'Đăng xuất',
            description: 'Đăng xuất tài khoản',
            security: [{ BearerAuth: [] }],
            responses: {
                200: {
                    description: 'Đăng xuất thành công',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 200
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Đăng xuất thành công'
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: 'Không có quyền truy cập',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 401
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Không có quyền truy cập'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/changepass': {
        put: {
            tags: ['Authentication'],
            summary: 'Đổi mật khẩu',
            description: 'Thay đổi mật khẩu tài khoản',
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                password: {
                                    type: 'string',
                                    example: '123456',
                                    description: 'Mật khẩu cũ'
                                },
                                newPassword: {
                                    type: 'string',
                                    example: '654321',
                                    description: 'Mật khẩu mới'
                                },
                                confirmPassword: {
                                    type: 'string',
                                    example: '654321',
                                    description: 'Xác nhận mật khẩu mới'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Đổi mật khẩu thành công',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 200
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Đổi mật khẩu thành công'
                                    },
                                    accessToken: {
                                        type: 'string',
                                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6InVzZXIiLCJpYXQiOjE3NDg4MzAxODIsImV4cCI6MTc0ODgzMTk4Mn0.CCq45tW-6ND-c1Fafejj9C87q_wOBxCCZjr7EY0W_wo'
                                    },
                                    requireRelogin: {
                                        type: 'boolean',
                                        example: true
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: 'Thông tin không hợp lệ',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 400
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Mật khẩu không trùng khớp'
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: 'Không có quyền truy cập',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 401
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Không có quyền truy cập'
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: 'Không tìm thấy người dùng',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 404
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Không tìm thấy người dùng'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/users': {
        get: {
            tags: ['Users'],
            summary: 'Lấy danh sách người dùng',
            description: 'Lấy danh sách tất cả người dùng',
            security: [{ BearerAuth: [] }],
            responses: {
                200: {
                    description: 'Lấy danh sách thành công',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 200
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Lấy thành công'
                                    },
                                    data: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: {
                                                    type: 'number',
                                                    example: 1
                                                },
                                                username: {
                                                    type: 'string',
                                                    example: 'congtung'
                                                },
                                                email: {
                                                    type: 'string',
                                                    example: 'tung@gmail.com'
                                                },
                                                role: {
                                                    type: 'string',
                                                    example: 'user'
                                                },
                                                avatar: {
                                                    type: 'string',
                                                    example: 'tung.jpg'
                                                },
                                                gender: {
                                                    type: 'string',
                                                    example: 'male'
                                                },
                                                birthday: {
                                                    type: 'string',
                                                    format: 'date',
                                                    example: '2002-02-01'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: 'Không có quyền truy cập',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 401
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Không có quyền truy cập'
                                    }
                                }
                            }
                        }
                    }
                },
                403: {
                    description: 'Không đủ quyền',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 403
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Không đủ quyền truy cập'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        post: {
            tags: ['Users'],
            summary: 'Thêm người dùng mới',
            description: 'Thêm người dùng mới (chỉ admin)',
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                username: {
                                    type: 'string',
                                    example: 'newuser'
                                },
                                email: {
                                    type: 'string',
                                    example: 'newuser@gmail.com'
                                },
                                password: {
                                    type: 'string',
                                    example: '123456'
                                },
                                avatar: {
                                    type: 'string',
                                    example: 'avatar.jpg'
                                },
                                role: {
                                    type: 'string',
                                    example: 'user'
                                },
                                gender: {
                                    type: 'string',
                                    example: 'female'
                                },
                                birthday: {
                                    type: 'string',
                                    format: 'date',
                                    example: '1995-05-15'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Tạo người dùng thành công',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 201
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Đăng ký thành công'
                                    },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: {
                                                type: 'number',
                                                example: 10
                                            },
                                            username: {
                                                type: 'string',
                                                example: 'newuser'
                                            },
                                            email: {
                                                type: 'string',
                                                example: 'newuser@gmail.com'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: 'Lỗi dữ liệu',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 400
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Email đã tồn tại'
                                    }
                                }
                            }
                        }
                    }
                },
                403: {
                    description: 'Không đủ quyền',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 403
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Không đủ quyền thực hiện thao tác này'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/users/{id}': {
        put: {
            tags: ['Users'],
            summary: 'Cập nhật thông tin người dùng',
            description: 'Cập nhật thông tin của một người dùng theo ID',
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'ID của người dùng',
                    schema: {
                        type: 'integer'
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                username: {
                                    type: 'string',
                                    example: 'updatedname'
                                },
                                avatar: {
                                    type: 'string',
                                    example: 'new-avatar.jpg'
                                },
                                gender: {
                                    type: 'string',
                                    example: 'female'
                                },
                                birthday: {
                                    type: 'string',
                                    format: 'date',
                                    example: '1995-01-01'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Cập nhật thành công',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 200
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Cập nhật thành công'
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: 'Không tìm thấy người dùng',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 404
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Không tìm thấy người dùng'
                                    }
                                }
                            }
                        }
                    }
                },
                403: {
                    description: 'Không đủ quyền',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 403
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Không đủ quyền thực hiện thao tác này'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        delete: {
            tags: ['Users'],
            summary: 'Xóa người dùng',
            description: 'Xóa một người dùng theo ID (chỉ admin)',
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'ID của người dùng',
                    schema: {
                        type: 'integer'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Xóa thành công',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 200
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Xóa thành công'
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: 'Không tìm thấy người dùng',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 404
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Không tìm thấy người dùng'
                                    }
                                }
                            }
                        }
                    }
                },
                403: {
                    description: 'Không đủ quyền',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 403
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Không đủ quyền thực hiện thao tác này'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
