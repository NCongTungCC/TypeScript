"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paths = void 0;
exports.paths = {
    '/signup': {
        post: {
            tags: ['Authentication'],
            summary: 'SignUp',
            description: 'Register a new account',
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
                    description: 'Registration successful',
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
                                        example: 'Registration successful'
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
                409: {
                    description: 'Email already exists',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 409
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Email is already in use'
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: 'Server error',
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
                                        example: 'An error occurred on the server'
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
            summary: 'LogIn',
            description: 'User authentication',
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
                    description: 'Login successful',
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
                                        example: 'Login successful'
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
                401: {
                    description: 'Incorrect password',
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
                                        example: 'Incorrect password'
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: 'Account not found',
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
                                        example: 'Email not found'
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: 'Server error',
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
                                        example: 'Server error occurred'
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
            summary: 'LogOut',
            description: 'End user session',
            security: [{ BearerAuth: [] }],
            responses: {
                200: {
                    description: 'Logout successful',
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
                                        example: 'Logout successful'
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: 'Unauthorized',
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
                                        example: 'Unauthorized access'
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
            summary: 'Change Password',
            description: 'Change user account password',
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
                                    description: 'Current password'
                                },
                                newPassword: {
                                    type: 'string',
                                    example: '654321',
                                    description: 'New password'
                                },
                                confirmPassword: {
                                    type: 'string',
                                    example: '654321',
                                    description: 'Confirm new password'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Password changed successfully',
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
                                        example: 'Password changed successfully'
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
                401: {
                    description: 'Incorrect old password',
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
                                        example: 'Incorrect old password'
                                    }
                                }
                            }
                        }
                    }
                },
                422: {
                    description: 'Validation error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 422
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Passwords do not match'
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: 'User not found',
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
                                        example: 'User not found'
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
            summary: 'Get All Users',
            description: 'Retrieve list of all users',
            security: [{ BearerAuth: [] }],
            responses: {
                200: {
                    description: 'Users retrieved successfully',
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
                                        example: 'Get user successfully'
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
                    description: 'Unauthorized',
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
                                        example: 'Unauthorized access'
                                    }
                                }
                            }
                        }
                    }
                },
                403: {
                    description: 'Forbidden',
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
                                        example: 'Insufficient permissions'
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
            summary: 'Create New User',
            description: 'Create a new user (admin only)',
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
                    description: 'User created successfully',
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
                                        example: 'User created successfully'
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
                409: {
                    description: 'Email already exists',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 409
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Email is already in use'
                                    }
                                }
                            }
                        }
                    }
                },
                403: {
                    description: 'Forbidden',
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
                                        example: 'Insufficient permissions to perform this action'
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
            summary: 'Update User',
            description: 'Update user information by ID',
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'User ID',
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
                    description: 'User updated successfully',
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
                                        example: 'User updated successfully'
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: 'User not found',
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
                                        example: 'User not found'
                                    }
                                }
                            }
                        }
                    }
                },
                403: {
                    description: 'Forbidden',
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
                                        example: 'Insufficient permissions to perform this action'
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
            summary: 'Delete User',
            description: 'Remove a user by ID (admin only)',
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'User ID',
                    schema: {
                        type: 'integer'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'User deleted successfully',
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
                                        example: 'User deleted successfully'
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: 'User not found',
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
                                        example: 'User not found'
                                    }
                                }
                            }
                        }
                    }
                },
                403: {
                    description: 'Forbidden',
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
                                        example: 'Insufficient permissions to perform this action'
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
