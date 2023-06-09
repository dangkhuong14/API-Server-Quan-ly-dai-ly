import { gql } from 'apollo-boost';

const addDailyMutation = gql`
  mutation($TenDaiLy: String!, $DienThoai: String!, $DiaChi: String!, $NgayTiepNhan: String!, $TienNo: Int, $Email: String, $MaQuan: ID!, $MaLoaiDaiLy: ID!) {
    addDaily(TenDaiLy: $TenDaiLy, DienThoai: $DienThoai, DiaChi: $DiaChi, NgayTiepNhan: $NgayTiepNhan, TienNo: $TienNo, Email: $Email, MaQuan: $MaQuan, MaLoaiDaiLy: $MaLoaiDaiLy) {
      MaDaiLy
      TenDaiLy
      DienThoai
      DiaChi
      NgayTiepNhan
      TienNo
      Email
      MaQuan
      MaLoaiDaiLy
    }
  }
`

const updateDailyMutation = gql`
  mutation($MaDaiLy: ID!, $TenDaiLy: String!, $DienThoai: String!, $DiaChi: String!, $NgayTiepNhan: String!, $TienNo: Int, $Email: String, $MaQuan: ID!, $MaLoaiDaiLy: ID!) {
    updateDaily(MaDaiLy: $MaDaiLy, TenDaiLy: $TenDaiLy, DienThoai: $DienThoai, DiaChi: $DiaChi, NgayTiepNhan: $NgayTiepNhan, TienNo: $TienNo, Email: $Email, MaQuan: $MaQuan, MaLoaiDaiLy: $MaLoaiDaiLy) {
      MaDaiLy
      TenDaiLy
      DienThoai
      DiaChi
      NgayTiepNhan
      TienNo
      Email
      MaQuan
      MaLoaiDaiLy
    }
  }
`

const deleteDailyMutation = gql`
  mutation($MaDaiLy: ID!){
    deleteDaily(MaDaiLy: $MaDaiLy){
      MaDaiLy
      TenDaiLy
      DienThoai
      DiaChi
      NgayTiepNhan
      TienNo
      Email
      MaQuan
      MaLoaiDaiLy
    }
  }
`

const addQuanMutation = gql`
  mutation($TenQuan: String!) {
    addQuan(TenQuan: $TenQuan) {
      MaQuan
      TenQuan
    }
  }
`

const updateQuanMutation = gql`
  mutation($MaQuan: ID!, $TenQuan: String!) {
    updateQuan(MaQuan: $MaQuan, TenQuan: $TenQuan) {
      MaQuan
      TenQuan
    }
  }
`

const deleteQuanMutation = gql`
  mutation($MaQuan: ID!){
    deleteQuan(MaQuan: $MaQuan){
      MaQuan
      TenQuan
    }
  }
`

const addLoaidailyMutation = gql`
  mutation($TenLoaiDaiLy: String!, $SoNoToiDa: Int!) {
    addLoaidaily(TenLoaiDaiLy: $TenLoaiDaiLy, SoNoToiDa: $SoNoToiDa) {
      MaLoaiDaiLy
      TenLoaiDaiLy
      SoNoToiDa
    }
  }
`

const updateLoaidailyMutation = gql`
  mutation($MaLoaiDaiLy: ID!, $TenLoaiDaiLy: String!, $SoNoToiDa: Int!) {
    updateLoaidaily(MaLoaiDaiLy: $MaLoaiDaiLy, TenLoaiDaiLy: $TenLoaiDaiLy, SoNoToiDa: $SoNoToiDa) {
      MaLoaiDaiLy
      TenLoaiDaiLy
      SoNoToiDa
    }
  }
`

const deleteLoaidailyMutation = gql`
  mutation($MaLoaiDaiLy: ID!){
    deleteLoaidaily(MaLoaiDaiLy: $MaLoaiDaiLy){
      MaLoaiDaiLy
      TenLoaiDaiLy
      SoNoToiDa
    }
  }
`

const addDvtMutation = gql`
  mutation($TenDVT: String!) {
    addDvt(TenDVT: $TenDVT) {
      MaDVT
      TenDVT
    }
  }
`

const updateDvtMutation = gql`
  mutation($MaDVT: ID!, $TenDVT: String!) {
    updateDvt(MaDVT: $MaDVT, TenDVT: $TenDVT) {
      MaDVT
      TenDVT
    }
  }
`

const deleteDvtMutation = gql`
  mutation($MaDVT: ID!){
    deleteDvt(MaDVT: $MaDVT){
      MaDVT
      TenDVT
    }
  }
`

const addPhieunhaphangMutation = gql`
  mutation($SoLuong: Int!, $MaMatHang: ID!) {
    addPhieunhaphang(SoLuong: $SoLuong, MaMatHang: $MaMatHang) {
      MaPhieuNhap
      SoLuong
      MaMatHang
    }
  }
`

const updatePhieunhaphangMutation = gql`
  mutation($MaPhieuNhap: ID!, $SoLuong: Int!, $MaMatHang: ID!) {
    updatePhieunhaphang(MaPhieuNhap: $MaPhieuNhap, SoLuong: $SoLuong, MaMatHang: $MaMatHang) {
      MaPhieuNhap
      SoLuong
      MaMatHang
    }
  }
`

const deletePhieunhaphangMutation = gql`
  mutation($MaPhieuNhap: ID!){
    deletePhieunhaphang(MaPhieuNhap: $MaPhieuNhap){
      MaPhieuNhap
      SoLuong
      MaMatHang
    }
  }
`

const addMathangMutation = gql`
  mutation($TenMatHang: String!, $SoLuongTon: Int!, $DonGiaNhap: Int!, $MaDVT: ID!) {
    addMathang(TenMatHang: $TenMatHang, SoLuongTon: $SoLuongTon, DonGiaNhap: $DonGiaNhap, MaDVT: $MaDVT) {
      MaMatHang
      TenMatHang
      SoLuongTon
      DonGiaNhap
      MaDVT
    }
  }
`

const updateMathangMutation = gql`
  mutation($MaMatHang: ID!, $TenMatHang: String!, $SoLuongTon: Int!, $DonGiaNhap: Int!, $MaDVT: ID!) {
    updateMathang(MaMatHang: $MaMatHang, TenMatHang: $TenMatHang, SoLuongTon: $SoLuongTon, DonGiaNhap: $DonGiaNhap, MaDVT: $MaDVT) {
      MaMatHang
      TenMatHang
      SoLuongTon
      DonGiaNhap
      MaDVT
    }
  }
`

const deleteMathangMutation = gql`
  mutation($MaMatHang: ID!){
    deleteMathang(MaMatHang: $MaMatHang){
      MaMatHang
      TenMatHang
      SoLuongTon
      DonGiaNhap
      MaDVT
    }
  }
`

const addPhieuxuathangMutation = gql`
  mutation($NgayLapPhieu: String!, $TongTien: Int!, $MaDaiLy: ID!) {
    addPhieuxuathang(NgayLapPhieu: $NgayLapPhieu, TongTien: $TongTien, MaDaiLy: $MaDaiLy) {
      MaPhieuXuat
      NgayLapPhieu
      TongTien
      MaDaiLy
    }
  }
`

const updatePhieuxuathangMutation = gql`
  mutation($MaPhieuXuat: ID!, $NgayLapPhieu: String!, $TongTien: Int!, $MaDaiLy: ID!) {
    updatePhieuxuathang(MaPhieuXuat: $MaPhieuXuat, NgayLapPhieu: $NgayLapPhieu, TongTien: $TongTien, MaDaiLy: $MaDaiLy) {
      MaPhieuXuat
      NgayLapPhieu
      TongTien
      MaDaiLy
    }
  }
`

const deletePhieuxuathangMutation = gql`
  mutation($MaPhieuXuat: ID!){
    deletePhieuxuathang(MaPhieuXuat: $MaPhieuXuat){
      MaPhieuXuat
      NgayLapPhieu
      TongTien
      MaDaiLy
    }
  }
`

const addCt_phieuxuathangMutation = gql`
  mutation($MaPhieuXuat: ID!, $MaMatHang: ID!) {
    addCt_phieuxuathang(MaPhieuXuat: $MaPhieuXuat, MaMatHang: $MaMatHang) {
      MaCT_PXH
      MaPhieuXuat
      MaMatHang
    }
  }
`

const updateCt_phieuxuathangMutation = gql`
  mutation($MaCT_PXH: ID!, $MaPhieuXuat: ID!, $MaMatHang: ID!) {
    updateCt_phieuxuathang(MaCT_PXH: $MaCT_PXH, MaPhieuXuat: $MaPhieuXuat, MaMatHang: $MaMatHang) {
      MaCT_PXH
      MaPhieuXuat
      MaMatHang
    }
  }
`

const deleteCt_phieuxuathangMutation = gql`
  mutation($MaCT_PXH: ID!){
    deleteCt_phieuxuathang(MaCT_PXH: $MaCT_PXH){
      MaCT_PXH
      MaPhieuXuat
      MaMatHang
    }
  }
`

const addBaocaodoanhsoMutation = gql`
  mutation($Thang: String!) {
    addBaocaodoanhso(Thang: $Thang) {
      MaBaoCaoDoanhSo
      Thang
    }
  }
`

const updateBaocaodoanhsoMutation = gql`
  mutation($MaBaoCaoDoanhSo: ID!, $Thang: String!) {
    updateBaocaodoanhso(MaBaoCaoDoanhSo: $MaBaoCaoDoanhSo, Thang: $Thang) {
      MaBaoCaoDoanhSo
      Thang
    }
  }
`

const deleteBaocaodoanhsoMutation = gql`
  mutation($MaBaoCaoDoanhSo: ID!){
    deleteBaocaodoanhso(MaBaoCaoDoanhSo: $MaBaoCaoDoanhSo){
      MaBaoCaoDoanhSo
      Thang
    }
  }
`

const addCt_bcdsMutation = gql`
  mutation($MaBaoCaoDoanhSo: ID!, $MaDaiLy: ID!, $SoPhieuXuat: Int!, $TongTriGia: Int!, $Tyle: Int!) {
    addCt_bcds(MaBaoCaoDoanhSo: $MaBaoCaoDoanhSo, MaDaiLy: $MaDaiLy, SoPhieuXuat: $SoPhieuXuat, TongTriGia: $TongTriGia, Tyle: $Tyle) {
      MaCT_BCDS
      MaBaoCaoDoanhSo
      MaDaiLy
      SoPhieuXuat
      TongTriGia
      Tyle
    }
  }
`

const updateCt_bcdsMutation = gql`
  mutation($MaCT_BCDS: ID!, $MaBaoCaoDoanhSo: ID!, $MaDaiLy: ID!, $SoPhieuXuat: Int!, $TongTriGia: Int!, $Tyle: Int!) {
    updateCt_bcds(MaCT_BCDS: $MaCT_BCDS, MaBaoCaoDoanhSo: $MaBaoCaoDoanhSo, MaDaiLy: $MaDaiLy, SoPhieuXuat: $SoPhieuXuat, TongTriGia: $TongTriGia, Tyle: $Tyle) {
      MaCT_BCDS
      MaBaoCaoDoanhSo
      MaDaiLy
      SoPhieuXuat
      TongTriGia
      Tyle
    }
  }
`

const deleteCt_bcdsMutation = gql`
  mutation($MaCT_BCDS: ID!){
    deleteCt_bcds(MaCT_BCDS: $MaCT_BCDS){
      MaCT_BCDS
      MaBaoCaoDoanhSo
      MaDaiLy
      SoPhieuXuat
      TongTriGia
      Tyle
    }
  }
`

const addPhieuthutienMutation = gql`
  mutation($MaDaiLy: ID!, $NgayThuTien: String!, $SoTienThu: Int!) {
    addPhieuthutien(MaDaiLy: $MaDaiLy, NgayThuTien: $NgayThuTien, SoTienThu: $SoTienThu) {
      MaPhieuThuTien
      MaDaiLy
      NgayThuTien
      SoTienThu
    }
  }
`

const updatePhieuthutienMutation = gql`
  mutation($MaPhieuThuTien: ID!, $MaDaiLy: ID!, $NgayThuTien: String!, $SoTienThu: Int!) {
    updatePhieuthutien(MaPhieuThuTien: $MaPhieuThuTien, MaDaiLy: $MaDaiLy, NgayThuTien: $NgayThuTien, SoTienThu: $SoTienThu) {
      MaPhieuThuTien
      MaDaiLy
      NgayThuTien
      SoTienThu
    }
  }
`

const deletePhieuthutienMutation = gql`
  mutation($MaPhieuThuTien: ID!){
    deletePhieuthutien(MaPhieuThuTien: $MaPhieuThuTien){
      MaPhieuThuTien
      MaDaiLy
      NgayThuTien
      SoTienThu
    }
  }
`

const addBaocaocongnoMutation = gql`
  mutation($Thang: String!) {
    addBaocaocongno(Thang: $Thang) {
      MaBaoCaoCongNo
      Thang
    }
  }
`

const updateBaocaocongnoMutation = gql`
  mutation($MaBaoCaoCongNo: ID!, $Thang: String!) {
    updateBaocaocongno(MaBaoCaoCongNo: $MaBaoCaoCongNo, Thang: $Thang) {
      MaBaoCaoCongNo
      Thang
    }
  }
`

const deleteBaocaocongnoMutation = gql`
  mutation($MaBaoCaoCongNo: ID!){
    deleteBaocaocongno(MaBaoCaoCongNo: $MaBaoCaoCongNo){
      MaBaoCaoCongNo
      Thang
    }
  }
`

const addCt_bccnMutation = gql`
  mutation($MaBaoCaoCongNo: ID!, $MaDaiLy: ID!, $NoDau: Int!, $PhatSinh: Int!, $NoCuoi: Int!) {
    addCt_bccn(MaBaoCaoCongNo: $MaBaoCaoCongNo, MaDaiLy: $MaDaiLy, NoDau: $NoDau, PhatSinh: $PhatSinh, NoCuoi: $NoCuoi) {
      MaCT_BCCN
      MaBaoCaoCongNo
      MaDaiLy
      NoDau
      PhatSinh
      NoCuoi
    }
  }
`

const updateCt_bccnMutation = gql`
  mutation($MaCT_BCCN: ID!, $MaBaoCaoCongNo: ID!, $MaDaiLy: ID!, $NoDau: Int!, $PhatSinh: Int!, $NoCuoi: Int!) {
    updateCt_bccn(MaCT_BCCN: $MaCT_BCCN, MaBaoCaoCongNo: $MaBaoCaoCongNo, MaDaiLy: $MaDaiLy, NoDau: $NoDau, PhatSinh: $PhatSinh, NoCuoi: $NoCuoi) {
      MaCT_BCCN
      MaBaoCaoCongNo
      MaDaiLy
      NoDau
      PhatSinh
      NoCuoi
    }
  }
`

const deleteCt_bccnMutation = gql`
  mutation($MaCT_BCCN: ID!){
    deleteCt_bccn(MaCT_BCCN: $MaCT_BCCN){
      MaCT_BCCN
      MaBaoCaoCongNo
      MaDaiLy
      NoDau
      PhatSinh
      NoCuoi
    }
  }
`

export {
    addDailyMutation,
    updateDailyMutation,
    deleteDailyMutation,
    addQuanMutation,
    updateQuanMutation,
    deleteQuanMutation,
    addLoaidailyMutation,
    updateLoaidailyMutation,
    deleteLoaidailyMutation,
    addDvtMutation,
    updateDvtMutation,
    deleteDvtMutation,
    addPhieunhaphangMutation,
    updatePhieunhaphangMutation,
    deletePhieunhaphangMutation,
    addMathangMutation,
    updateMathangMutation,
    deleteMathangMutation,
    addPhieuxuathangMutation,
    updatePhieuxuathangMutation,
    deletePhieuxuathangMutation,
    addCt_phieuxuathangMutation,
    updateCt_phieuxuathangMutation,
    deleteCt_phieuxuathangMutation,
    addBaocaodoanhsoMutation,
    updateBaocaodoanhsoMutation,
    deleteBaocaodoanhsoMutation,
    addCt_bcdsMutation,
    updateCt_bcdsMutation,
    deleteCt_bcdsMutation,
    addPhieuthutienMutation,
    updatePhieuthutienMutation,
    deletePhieuthutienMutation,
    addBaocaocongnoMutation,
    updateBaocaocongnoMutation,
    deleteBaocaocongnoMutation,
    addCt_bccnMutation,
    updateCt_bccnMutation,
    deleteCt_bccnMutation,
};