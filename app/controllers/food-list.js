import { Menu } from "../models/Menu.js";
import { MonAn } from "../models/MonAn.js";
import { DANH_SACH_MON_AN } from "../util/settings.js";

// let danhSachMonAn = [];
let menu = new Menu();
menu.layDanhSachMonAn();
menu.renderTableMonAn('tbody');

console.log(menu);

// let renderTable = (mangMonAn) => { //[{maMon:1,tenMon:'Cơm chiên',...},{maMon:2,tenMon:'Cơm sườn',...,{maMon:3,tenMon:'Lẩu thái',...}}]
//     let html = '';
//     for (let i = 0; i < mangMonAn.length; i++) {
//         //Mỗi lần duyệt lấy ra 1 object món ăn
//         let monAnPrototype = new MonAn();
//         let monAn = mangMonAn[i];
//         monAn = {...monAnPrototype, ...monAn};
//         html += `
//             <tr>
//                 <td>${monAn.maMon}</td>
//                 <td>${monAn.tenMon}</td>
//                 <td>${monAn.loaiMon}</td>
//                 <td>${monAn.giaMon}</td>
//                 <td>${monAn.khuyenMai} %</td>
//                 <td>${monAn.tinhGiaKhuyenMai()}</td>
//                 <td>${monAn.maTinhTrang}</td>
//             </tr>
//         `
//     }
//     document.querySelector('tbody').innerHTML = html;
// }
// renderTable(menu.danhSachMonAn);


window.xoaMonAn = function (maMonAnClick) {
    // console.log(maMonAnClick);
    menu.xoaMonAn(maMonAnClick);
    menu.renderTableMonAn('tbody');
    // menu.luuDanhSachMonAn();

}

window.chinhSuaMon = function (maMonAnClick) {

    let monAnChinhSua = menu.layThongTinMonAn(maMonAnClick);

    if(monAnChinhSua) {
        //Gán lên modal popup
        console.log('monAnChinhSua',monAnChinhSua);
        //Load lên giao diện
        let arrInput = document.querySelectorAll('#foodForm input, #foodForm select,#foodForm textarea');
        for(let input of arrInput) {
            let {id} = input; //maMon, tenMon
            input.value = monAnChinhSua[id];
        }

    }
}

document.querySelector('#btnCapNhat').onclick = function () {
    //Lấy giá trị input từ giao diện => cập nhật cho menu.danhSachMonAn
    let arrInput = document.querySelectorAll('#foodForm input, #foodForm select,#foodForm textarea');
    let monAnCapNhat = new MonAn();
    for(let input of arrInput) {
        let {id,value} = input;
        monAnCapNhat[id] = value;
    }
    console.log('monAnCapNhat',monAnCapNhat)
    //Cập nhật object monAn trong menu.danhSachMonAn
    menu.capNhatMonAn(monAnCapNhat.maMon,monAnCapNhat);
    //render lại table
    menu.renderTableMonAn('tbody');
}

document.querySelector('#selLoai').onchange = function () {

    //Lấy ra loại người dùng onchange
    let loai = document.querySelector('#selLoai').value;

    //Backup lại danh sách món ăn trước khi filter
    let temp = [...menu.danhSachMonAn];
    //Gán danh sách món ăn filter theo loại
    menu.danhSachMonAn = menu.filterMonAn(loai);

    //render table
    menu.renderTableMonAn('tbody');
    
    menu.danhSachMonAn = temp;

}