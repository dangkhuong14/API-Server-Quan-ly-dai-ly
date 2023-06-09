import gql from "graphql-tag"

const typeDefs = gql`
  type Daily {
    MaDaiLy: ID
    TenDaiLy: String!
    DienThoai: String!
    DiaChi: String!
    NgayTiepNhan: String!
    TienNo: Int
    Email: String
    MaQuan: ID!
    relatedQuan: Quan
    MaLoaiDaiLy: ID!
    relatedLoaidaily: Loaidaily
  }

  type Quan {
    MaQuan: ID
    TenQuan: String!
  }

  type Loaidaily {
    MaLoaiDaiLy: ID
    TenLoaiDaiLy: String!
    SoNoToiDa: Int!
  }

  type Dvt {
    MaDVT: ID
    TenDVT: String!
  }

  type Phieunhaphang {
    MaPhieuNhap: ID
    SoLuong: Int!
    MaMatHang: ID!
    relatedMathang: Mathang
  }

  type Mathang {
    MaMatHang: ID
    TenMatHang: String!
    SoLuongTon: Int!
    DonGiaNhap: Int!
    MaDVT: ID!
    relatedDvt: Dvt
  }

  type Phieuxuathang {
    MaPhieuXuat: ID
    NgayLapPhieu: String!
    TongTien: Int!
    MaDaiLy: ID!
    relatedDaily: Daily
  }

  type Ct_phieuxuathang {
    MaCT_PXH: ID
    MaPhieuXuat: ID!
    relatedPhieuxuathang: Phieuxuathang
    MaMatHang: ID!
    relatedMathang: Mathang
  }

  type Baocaodoanhso {
    MaBaoCaoDoanhSo: ID
    Thang: String!
  }

  type Ct_bcds {
    MaCT_BCDS: ID
    MaBaoCaoDoanhSo: ID!
    relatedBaocaodoanhso: Baocaodoanhso
    MaDaiLy: ID!
    relatedDaily: Daily
    SoPhieuXuat: Int!
    TongTriGia: Int!
    Tyle: Int!
  }

  type Phieuthutien {
    MaPhieuThuTien: ID
    MaDaiLy: ID!
    relatedDaily: Daily
    NgayThuTien: String!
    SoTienThu: Int!
  }

  type Baocaocongno {
    MaBaoCaoCongNo: ID
    Thang: String!
  }

  type Ct_bccn {
    MaCT_BCCN: ID
    MaBaoCaoCongNo: ID!
    relatedBaocaocongno: Baocaocongno
    MaDaiLy: ID!
    relatedDaily: Daily
    NoDau: Int!
    PhatSinh: Int!
    NoCuoi: Int!
  }

  type Query {
    everyDaily: [Daily]
    daily(MaDaiLy: ID!): Daily
    everyQuan: [Quan]
    quan(MaQuan: ID!): Quan
    everyLoaidaily: [Loaidaily]
    loaidaily(MaLoaiDaiLy: ID!): Loaidaily
    everyDvt: [Dvt]
    dvt(MaDVT: ID!): Dvt
    everyPhieunhaphang: [Phieunhaphang]
    phieunhaphang(MaPhieuNhap: ID!): Phieunhaphang
    everyMathang: [Mathang]
    mathang(MaMatHang: ID!): Mathang
    everyPhieuxuathang: [Phieuxuathang]
    phieuxuathang(MaPhieuXuat: ID!): Phieuxuathang
    everyCt_phieuxuathang: [Ct_phieuxuathang]
    ct_phieuxuathang(MaCT_PXH: ID!): Ct_phieuxuathang
    everyBaocaodoanhso: [Baocaodoanhso]
    baocaodoanhso(MaBaoCaoDoanhSo: ID!): Baocaodoanhso
    everyCt_bcds: [Ct_bcds]
    ct_bcds(MaCT_BCDS: ID!): Ct_bcds
    everyPhieuthutien: [Phieuthutien]
    phieuthutien(MaPhieuThu: ID!): Phieuthutien
    everyBaocaocongno: [Baocaocongno]
    baocaocongno(MaBaoCaoCongNo: ID!): Baocaocongno
    everyCt_bccn: [Ct_bccn]
    ct_bccn(MaCT_BCCN: ID!): Ct_bccn
  }

  type Mutation {
    addDaily(TenDaiLy: String!, DienThoai: String!, DiaChi: String!, NgayTiepNhan: String!, TienNo: Int, Email: String, MaQuan: ID!, MaLoaiDaiLy: ID!): Daily
    updateDaily(MaDaiLy: ID!, TenDaiLy: String!, DienThoai: String!, DiaChi: String!, NgayTiepNhan: String!, TienNo: Int, Email: String, MaQuan: ID!, MaLoaiDaiLy: ID!): Daily
    deleteDaily(MaDaiLy: ID!): Daily

    addQuan(TenQuan: String!): Quan
    updateQuan(MaQuan: ID!, TenQuan: String!): Quan
    deleteQuan(MaQuan: ID!): Quan

    addLoaidaily(TenLoaiDaiLy: String!, SoNoToiDa: Int!): Loaidaily
    updateLoaidaily(MaLoaiDaiLy: ID!, TenLoaiDaiLy: String!, SoNoToiDa: Int!): Loaidaily
    deleteLoaidaily(MaLoaiDaiLy: ID!): Loaidaily

    addDvt(TenDVT: String!): Dvt
    updateDvt(MaDVT: ID!, TenDVT: String!): Dvt
    deleteDvt(MaDVT: ID!): Dvt

    addPhieunhaphang(SoLuong: Int!, MaMatHang: ID!): Phieunhaphang
    updatePhieunhaphang(MaPhieuNhap: ID!, SoLuong: Int!, MaMatHang: ID!): Phieunhaphang
    deletePhieunhaphang(MaPhieuNhap: ID!): Phieunhaphang

    addMathang(TenMatHang: String!, SoLuongTon: Int!, DonGiaNhap: Int!, MaDVT: ID!): Mathang
    updateMathang(MaMatHang: ID!, TenMatHang: String!, SoLuongTon: Int!, DonGiaNhap: Int!, MaDVT: ID!): Mathang
    deleteMathang(MaMatHang: ID!): Mathang

    addPhieuxuathang(NgayLapPhieu: String!, TongTien: Int!, MaDaiLy: ID!): Phieuxuathang
    updatePhieuxuathang(MaPhieuXuat: ID!, NgayLapPhieu: String!, TongTien: Int!, MaDaiLy: ID!): Phieuxuathang
    deletePhieuxuathang(MaPhieuXuat: ID!): Phieuxuathang

    addCt_phieuxuathang(MaPhieuXuat: ID!, MaMatHang: ID!): Ct_phieuxuathang
    updateCt_phieuxuathang(MaCT_PXH: ID!, MaPhieuXuat: ID!, MaMatHang: ID!): Ct_phieuxuathang
    deleteCt_phieuxuathang(MaCT_PXH: ID!): Ct_phieuxuathang

    addBaocaodoanhso(Thang: String!): Baocaodoanhso
    updateBaocaodoanhso(MaBaoCaoDoanhSo: ID, Thang: String!): Baocaodoanhso
    deleteBaocaodoanhso(MaBaoCaoDoanhSo: ID): Baocaodoanhso

    addCt_bcds(MaBaoCaoDoanhSo: ID!, MaDaiLy: ID!, SoPhieuXuat: Int!, TongTriGia: Int!, Tyle: Int!): Ct_bcds
    updateCt_bcds(MaCT_BCDS: ID, MaBaoCaoDoanhSo: ID!, MaDaiLy: ID!, SoPhieuXuat: Int!, TongTriGia: Int!, Tyle: Int!): Ct_bcds
    deleteCt_bcds(MaCT_BCDS: ID): Ct_bcds

    addPhieuthutien(MaDaiLy: ID!, NgayThuTien: String!, SoTienThu: Int!): Phieuthutien
    updatePhieuthutien(MaPhieuThuTien: ID, MaDaiLy: ID!, NgayThuTien: String!, SoTienThu: Int!): Phieuthutien
    deletePhieuthutien(MaPhieuThuTien: ID): Phieuthutien

    addBaocaocongno(Thang: String!): Baocaocongno
    updateBaocaocongno(MaBaoCaoCongNo: ID!, Thang: String!): Baocaocongno
    deleteBaocaocongno(MaBaoCaoCongNo: ID!): Baocaocongno

    addCt_bccn(MaBaoCaoCongNo: ID!, MaDaiLy: ID!, NoDau: Int!, PhatSinh: Int!, NoCuoi: Int!): Ct_bccn
    updateCt_bccn(MaCT_BCCN: ID!, MaBaoCaoCongNo: ID!, MaDaiLy: ID!, NoDau: Int!, PhatSinh: Int!, NoCuoi: Int!): Ct_bccn
    deleteCt_bccn(MaCT_BCCN: ID!): Ct_bccn
  }`

export default typeDefs