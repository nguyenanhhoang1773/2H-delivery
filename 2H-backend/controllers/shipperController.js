const Shipper = require("../models/shipper");

const getAvailableShipper = async (req, res) => {
  try {
    // Lấy ngẫu nhiên 1 shipper có isAvailable: true
    const availableShippers = await Shipper.aggregate([
      { $match: { isAvailable: true } },
      { $sample: { size: 1 } },
    ]);

    if (availableShippers.length === 0) {
      return res.status(404).json({ message: "Không có shipper sẵn sàng" });
    }

    const selectedShipper = availableShippers[0];

    // Cập nhật trạng thái shipper ngay sau khi chọn
    const updatedShipper = await Shipper.findByIdAndUpdate(
      selectedShipper._id,
      { isAvailable: false, lastActive: Date.now() },
      { new: true }
    );

    res.status(200).json(updatedShipper);
  } catch (error) {
    console.error("Lỗi khi lấy shipper:", error);
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
};
const setShipperAvailable = async (req, res) => {
  try {
    const { shipperId } = req.body;
    console.log("shipperId:", shipperId);
    const updatedShipper = await Shipper.findByIdAndUpdate(
      shipperId,
      { isAvailable: true, lastActive: Date.now() },
      { new: true }
    );

    if (!updatedShipper) {
      return res.status(404).json({ message: "Không tìm thấy shipper" });
    }

    res.status(200).json({
      message: "Cập nhật trạng thái thành công",
      shipper: updatedShipper,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái shipper:", error);
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
};
module.exports = {
  getAvailableShipper,
  setShipperAvailable,
};
