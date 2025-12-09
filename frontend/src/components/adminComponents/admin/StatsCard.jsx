const StatsCard = ({ label, value, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 font-medium">{label}</p>
          <p className={`text-5xl font-bold mt-3 text-${color}-600`}>{value}</p>
        </div>
        <div className={`w-16 h-16 bg-${color}-100 rounded-2xl flex items-center justify-center`}>
          <Icon className={`text-3xl text-${color}-600`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;