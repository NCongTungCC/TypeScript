export const paths = {
  '/signup': {
    post: {
      tags: ['Auth'],
      summary: 'Signup',
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
      tags: ['Auth'],
      summary: 'Login',
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
      tags: ['Auth'],
      summary: 'Logout',
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
  '/change-password': {
    put: {
      tags: ['Auth'],
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
'/forgot-password': {
  post: {
    tags: ['Auth'],
    summary: 'Forgot Password',
    description: 'Send OTP code to email for password reset',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                example: 'tung@gmail.com',
                description: 'User email address'
              }
            },
            required: ['email']
          }
        }
      }
    },
    responses: {
      200: {
        description: 'OTP sent successfully',
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
                  example: 'OTP sent to email'
                }
              }
            }
          }
        }
      },
      404: {
        description: 'Email not found',
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
                  example: 'Not found email'
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
                  example: 'Failed to send OTP'
                }
              }
            }
          }
        }
      }
    }
  }
},
'/verify-otp': {
  post: {
    tags: ['Auth'],
    summary: 'Verify OTP',
    description: 'Verify OTP code sent to email',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                example: 'tung@gmail.com',
                description: 'User email address'
              },
              otp: {
                type: 'string',
                example: '123456',
                description: 'OTP received in email'
              }
            },
            required: ['email', 'otp']
          }
        }
      }
    },
    responses: {
      200: {
        description: 'OTP verified successfully',
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
                  example: 'OTP verified successfully'
                }
              }
            }
          }
        }
      },
      401: {
        description: 'Invalid OTP',
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
                  example: 'Invalid or expired OTP'
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

'/reset-password': {
  post: {
    tags: ['Auth'],
    summary: 'Reset Password',
    description: 'Reset password after OTP verification',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                example: 'tung@gmail.com',
                description: 'User email address'
              },
              newPassword: {
                type: 'string',
                example: '654321',
                description: 'New password'
              }
            },
            required: ['email', 'newPassword']
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Password reset successfully',
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
                  example: 'Password reset successfully'
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
    summary: 'Search Users',
    description: 'Search users by username or email',
    security: [{ BearerAuth: [] }],
    parameters: [
      {
        name: 'username',
        in: 'query',
        schema: { type: 'string' },
        description: 'Keyword to search by username'
      },
      {
        name: 'page',
        in: 'query',
        schema: { type: 'number' },
        description: 'Page'
      },
      {
        name: 'limit',
        in: 'query',
        schema: { type: 'number' },
        description: ''
      },
    ],
    responses: {
      200: {
        description: 'Users found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Users found' },
                data: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'number', example: 1 },
                      username: { type: 'string', example: 'congtung' },
                      email: { type: 'string', example: 'tung@gmail.com' },
                      role: { type: 'string', example: 'user' },
                      avatar: { type: 'string', example: 'tung.jpg' },
                      gender: { type: 'string', example: 'male' },
                      birthday: { type: 'string', format: 'date', example: '2002-02-01' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      404: {
        description: 'No users found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 404 },
                message: { type: 'string', example: 'No users found' }
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
    },
     get: {
    tags: ['Users'],
    summary: 'Get User By ID',
    description: 'Retrieve user information by user ID',
    security: [{ BearerAuth: [] }],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'integer' },
        description: 'User ID'
      }
    ],
    responses: {
      200: {
        description: 'User found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 200 },
                message: { type: 'string', example: 'User found' },
                data: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 1 },
                    username: { type: 'string', example: 'congtung' },
                    email: { type: 'string', example: 'tung@gmail.com' },
                    role: { type: 'string', example: 'user' },
                    avatar: { type: 'string', example: 'tung.jpg' },
                    gender: { type: 'string', example: 'male' },
                    birthday: { type: 'string', format: 'date', example: '2002-02-01' }
                  }
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
                code: { type: 'number', example: 404 },
                message: { type: 'string', example: 'User not found' }
              }
            }
          }
        }
      }
    }
  }
  },
'/books': {
  get: {
    tags: ['Books'],
    summary: 'Get All Books',
    description: 'Retrieve a list of all books with pagination',
    parameters: [
      {
        name: 'page',
        in: 'query',
        schema: { type: 'integer', default: 1 },
        description: 'Page number'
      },
      {
        name: 'limit',
        in: 'query',
        schema: { type: 'integer', default: 10 },
        description: 'Number of items per page'
      },
      {
        name: 'title',
        in: 'query',
        schema: { type: 'string' },
        description: 'Filter books by title'
      },
    ],
    responses: {
      200: {
        description: 'Books retrieved successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Books retrieved successfully' },
                data: {
                  type: 'object',
                  properties: {
                    books: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'number', example: 1 },
                          title: { type: 'string', example: 'Clean Code' },
                          author: { type: 'string', example: 'Robert C. Martin' },
                          poster: { type: 'string', example: 'clean-code.jpg' },
                          year: { type: 'number', example: 2008 },
                          genre: { type: 'string', example: 'Programming' },
                          description: { type: 'string', example: 'A handbook of agile software craftsmanship' },
                          totalBooks: { type: 'number', example: 5 },
                          availableBooks: { type: 'number', example: 3 },
                          borrowedBooks: { type: 'number', example: 2 }
                        }
                      }
                    },
                    currentPage: { type: 'number', example: 1 },
                    totalPages: { type: 'number', example: 10 },
                    totalItems: { type: 'number', example: 100 }
                  }
                }
              }
            }
          }
        }
      },
      404: {
        description: 'No books found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 404 },
                message: { type: 'string', example: 'No books found' }
              }
            }
          }
        }
      }
    }
},
  post: {
    tags: ['Books'],
    summary: 'Create New Book',
    description: 'Add a new book to the library (admin only)',
    security: [{ BearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['title', 'author', 'year', 'genre'],
            properties: {
              title: { type: 'string', example: 'Design Patterns' },
              author: { type: 'string', example: 'Erich Gamma et al.' },
              poster: { type: 'string', example: 'design-patterns.jpg' },
              year: { type: 'number', example: 1994 },
              genre: { type: 'string', example: 'Programming' },
              description: { 
                type: 'string', 
                example: 'Elements of Reusable Object-Oriented Software' 
              },
              totalBooks: { type: 'number', example: 3 },
              availableBooks: { type: 'number', example: 3 }
            }
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Book created successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 201 },
                message: { type: 'string', example: 'Book created successfully' },
                data: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 10 },
                    title: { type: 'string', example: 'Design Patterns' },
                    author: { type: 'string', example: 'Erich Gamma et al.' }
                  }
                }
              }
            }
          }
        }
      },
      400: {
        description: 'Validation error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 400 },
                message: { type: 'string', example: 'Validation failed' },
                errors: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      property: { type: 'string', example: 'title' },
                      constraints: { 
                        type: 'object',
                        example: { isNotEmpty: 'Title should not be empty' } 
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      403: {
        description: 'Insufficient permissions',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 403 },
                message: { type: 'string', example: 'Admin access required' }
              }
            }
          }
        }
      }
    }
  }
},
'/books/{id}': {
  get: {
    tags: ['Books'],
    summary: 'Get Book By ID',
    description: 'Retrieve a book by its ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'integer' },
        description: 'Book ID'
      }
    ],
    responses: {
      200: {
        description: 'Book found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Book found' },
                data: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 1 },
                    title: { type: 'string', example: 'Clean Code' },
                    author: { type: 'string', example: 'Robert C. Martin' },
                    poster: { type: 'string', example: 'clean-code.jpg' },
                    year: { type: 'number', example: 2008 },
                    genre: { type: 'string', example: 'Programming' },
                    description: { type: 'string', example: 'A handbook of agile software craftsmanship' },
                    totalBooks: { type: 'number', example: 5 },
                    availableBooks: { type: 'number', example: 3 },
                    borrowedBooks: { type: 'number', example: 2 }
                  }
                }
              }
            }
          }
        }
      },
      404: {
        description: 'Book not found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Book not found' }
              }
            }
          }
        }
      }
    }
  },
  put: {
    tags: ['Books'],
    summary: 'Update Book',
    description: 'Update book information (admin only)',
    security: [{ BearerAuth: [] }],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'integer' },
        description: 'Book ID'
      }
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              title: { type: 'string', example: 'Updated Title' },
              author: { type: 'string', example: 'Updated Author' },
              poster: { type: 'string', example: 'updated-poster.jpg' },
              year: { type: 'number', example: 2010 },
              genre: { type: 'string', example: 'Updated Genre' },
              description: { type: 'string', example: 'Updated description of the book' },
              totalBooks: { type: 'number', example: 7 },
              availableBooks: { type: 'number', example: 5 }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Book updated successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Book updated successfully' }
              }
            }
          }
        }
      },
      404: {
        description: 'Book not found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Book not found' }
              }
            }
          }
        }
      },
      403: {
        description: 'Insufficient permissions',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 403 },
                message: { type: 'string', example: 'Admin access required' }
              }
            }
          }
        }
      }
    }
  },
  delete: {
    tags: ['Books'],
    summary: 'Delete Book',
    description: 'Remove a book from the library (admin only)',
    security: [{ BearerAuth: [] }],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'integer' },
        description: 'Book ID'
      }
    ],
    responses: {
      200: {
        description: 'Book deleted successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Book deleted successfully' }
              }
            }
          }
        }
      },
      404: {
        description: 'Book not found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Book not found' }
              }
            }
          }
        }
      },
      403: {
        description: 'Insufficient permissions',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 403 },
                message: { type: 'string', example: 'Admin access required' }
              }
            }
          }
        }
      }
    }
  }
},
'/books/{id}/borrow': {
  post: {
    tags: ['Books'],
    summary: 'Borrow Book',
    description: 'Borrow a book from the library',
    security: [{ BearerAuth: [] }],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'integer' },
        description: 'Book ID'
      }
    ],
    responses: {
      200: {
        description: 'Book borrowed successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Book borrowed successfully' },
                data: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 1 },
                    bookId: { type: 'number', example: 3 },
                    userId: { type: 'number', example: 2 },
                    borrowDate: { type: 'string', format: 'date-time', example: '2025-06-11T10:00:00Z' },
                    dueDate: { type: 'string', format: 'date-time', example: '2025-06-25T10:00:00Z' },
                    status: { type: 'string', example: 'borrowed' }
                  }
                }
              }
            }
          }
        }
      },
      400: {
        description: 'Book not available',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 400 },
                message: { type: 'string', example: 'Book is not available for borrowing' }
              }
            }
          }
        }
      },
      404: {
        description: 'Book not found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Book not found' }
              }
            }
          }
        }
      }
    }
  }
},

'/books/{id}/return': {
  put: {
    tags: ['Books'],
    summary: 'Return Book',
    description: 'Return a borrowed book to the library',
    security: [{ BearerAuth: [] }],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'integer' },
        description: 'Borrowing record ID'
      }
    ],
    responses: {
      200: {
        description: 'Book returned successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Book returned successfully' },
                data: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 1 },
                    bookId: { type: 'number', example: 3 },
                    userId: { type: 'number', example: 2 },
                    borrowDate: { type: 'string', format: 'date-time', example: '2025-06-11T10:00:00Z' },
                    returnDate: { type: 'string', format: 'date-time', example: '2025-06-20T14:30:00Z' },
                    status: { type: 'string', example: 'returned' }
                  }
                }
              }
            }
          }
        }
      },
      400: {
        description: 'Invalid operation',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 400 },
                message: { type: 'string', example: 'Book is already returned' }
              }
            }
          }
        }
      },
      404: {
        description: 'Record not found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Borrowing record not found' }
              }
            }
          }
        }
      }
    }
  }
},

};