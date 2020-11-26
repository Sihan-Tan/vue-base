import request from './request';

/**
 * 例子
 */
export function demo(data) {
  return request({
    url: '/admin/demo',
    method: 'post',
    data,
  });
}
